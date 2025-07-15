
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, User as UserIcon, Calendar, Plane } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

const countryDisplayMap: { [key: string]: string } = {
  pk: 'Pakistan',
  af: 'Afghanistan',
  bd: 'Bangladesh',
  cn: 'China',
  in: 'India',
  id: 'Indonesia',
  ir: 'Iran',
  iq: 'Iraq',
  jp: 'Japan',
  kz: 'Kazakhstan',
  my: 'Malaysia',
  mn: 'Mongolia',
  np: 'Nepal',
  om: 'Oman',
  ph: 'Philippines',
  qa: 'Qatar',
  sa: 'Saudi Arabia',
  sg: 'Singapore',
  kr: 'South Korea',
  lk: 'Sri Lanka',
  sy: 'Syria',
  th: 'Thailand',
  tr: 'Turkey',
  ae: 'United Arab Emirates',
  vn: 'Vietnam',
  usa: "United States",
  ca: "Canada",
  gb: "United Kingdom",
  au: "Australia",
  other: "Other"
};

const travelReasonMap: { [key: string]: string } = {
    tourism: 'Tourism or Visit',
    business: 'Business',
    work: 'Work',
    study: 'Study',
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    }, (error) => {
      console.error("Error fetching orders: ", error);
      toast({ title: "Error", description: "Could not fetch orders.", variant: "destructive" });
    });

    return () => unsubscribeFirestore();
  }, [user, toast]);

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-card border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2" />
                Logout
            </Button>
        </div>
      </header>
      <main className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Visa Applications</CardTitle>
            <CardDescription>Showing {orders.length} most recent applications.</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No orders found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map(order => (
                        <Card key={order.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{order.fullName}</span>
                                    <span className="text-sm font-medium text-muted-foreground">{countryDisplayMap[order.nationality] || order.nationality}</span>
                                </CardTitle>
                                <CardDescription>{order.email}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 flex-grow">
                                <div className="flex items-center text-sm">
                                    <Plane className="mr-3 h-4 w-4 text-muted-foreground" />
                                    <span>{travelReasonMap[order.travelReason] || 'N/A'}</span>
                                </div>
                                 <div className="flex items-center text-sm">
                                    <UserIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                                    <span>Passport: {order.passportNumber}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                                    <span>DOB: {format(new Date(order.dob.seconds * 1000), 'MMMM d, yyyy')}</span>
                                </div>
                                <Separator />
                                <p className="text-sm text-muted-foreground pt-2">
                                    {order.homeAddress}
                                </p>
                            </CardContent>
                            <CardFooter className="text-xs text-muted-foreground justify-between">
                                <span>Order ID: {order.id}</span>
                                <span>{format(new Date(order.createdAt.seconds * 1000), 'PPp')}</span>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
