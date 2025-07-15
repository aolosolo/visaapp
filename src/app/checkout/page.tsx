
import React, { Suspense } from 'react';
import { CheckoutForm } from '@/components/checkout-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

function CheckoutLoading() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Secure Checkout</CardTitle>
                    <CardDescription>
                        Loading your application details...
                    </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[425px] flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </CardContent>
            </Card>
        </div>
    );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutForm />
    </Suspense>
  );
}
