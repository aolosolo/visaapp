
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Lock, Loader2, Home } from 'lucide-react';
import { PaymentDetailsStep } from '@/components/payment-steps/payment-details-step';
import { OtpVerificationStep } from '@/components/payment-steps/otp-verification-step';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const paymentSteps = [
  { id: 1, title: 'Payment Information' },
  { id: 2, title: 'Verify Payment' },
  { id: 3, title: 'Payment Complete' },
];

export default function CheckoutPage() {
  const [currentPaymentStep, setCurrentPaymentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [applicationData, setApplicationData] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setApplicationData(parsedData);
      } catch (error) {
        console.error("Failed to parse application data", error);
        toast({ title: "Error", description: "Could not load application data.", variant: "destructive" });
        router.push('/');
      }
    }
  }, [searchParams, router, toast]);

  const handleNext = () => {
    if (currentPaymentStep === 1) {
       console.log("Card details entered, proceeding to OTP.");
       setCurrentPaymentStep(2);
    }
  };

  const handleBack = () => {
    if (currentPaymentStep > 1) {
      setCurrentPaymentStep(currentPaymentStep - 1);
    } else {
        router.back();
    }
  };

  const handleVerify = async () => {
    setIsProcessing(true);
    console.log("Verifying OTP and submitting application...");
    
    // Simulate payment verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (applicationData) {
        try {
            await addDoc(collection(db, "orders"), {
                ...applicationData,
                createdAt: serverTimestamp(),
                status: 'paid',
                amount: 116
            });
            toast({
                title: "Payment Successful!",
                description: "Your payment has been verified and application submitted."
            });
            setCurrentPaymentStep(3);
        } catch (error) {
             console.error("Error writing document: ", error);
             toast({
                title: "Submission Failed",
                description: "There was an error saving your application. Please try again.",
                variant: "destructive"
            });
        }
    } else {
         // This handles the "Test Pay" case
         toast({
            title: "Test Payment Successful!",
            description: "Your test payment has been verified."
        });
        setCurrentPaymentStep(3);
    }

    setIsProcessing(false);
  }

  const renderStepContent = () => {
    switch (currentPaymentStep) {
      case 1:
        return <PaymentDetailsStep />;
      case 2:
        return <OtpVerificationStep />;
      case 3:
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h3>
            <p className="text-muted-foreground mb-6">Your payment has been processed and your application is submitted.</p>
            <Button asChild>
              <Link href="/"><Home className="mr-2" /> Go to Homepage</Link>
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Secure Checkout</CardTitle>
                <CardDescription>
                    {paymentSteps[currentPaymentStep - 1].title}
                </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px]">
                {renderStepContent()}
            </CardContent>
            {currentPaymentStep < 3 && (
                <div className="flex justify-between p-6">
                    <Button type="button" variant="outline" onClick={handleBack} disabled={isProcessing}>
                        <ArrowLeft className="mr-2" />
                        Back
                    </Button>
                    
                    {currentPaymentStep === 1 ? (
                    <Button type="button" onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Proceed to Verify
                        <ArrowRight className="ml-2" />
                    </Button>
                    ) : (
                    <Button type="button" onClick={handleVerify} className="bg-green-600 hover:bg-green-700 text-white" disabled={isProcessing}>
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Lock className="mr-2" />
                                Verify & Pay
                            </>
                        )}
                    </Button>
                    )}
                </div>
            )}
        </Card>
    </div>
  );
}
