
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { UserDetailsStep } from '@/components/payment-steps/user-details-step';
import { PaymentDetailsStep } from '@/components/payment-steps/payment-details-step';
import { OtpVerificationStep } from '@/components/payment-steps/otp-verification-step';
import { useToast } from '@/hooks/use-toast';
import { useFormContext } from 'react-hook-form';

const paymentSteps = [
  { id: 1, title: 'Confirm Your Details' },
  { id: 2, title: 'Payment Information' },
  { id: 3, title: 'Verify Payment' },
];

interface PaymentStepProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function PaymentStep({ onBack, onSubmit }: PaymentStepProps) {
  const [currentPaymentStep, setCurrentPaymentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { getValues } = useFormContext();

  const handleNext = () => {
    if (currentPaymentStep === 1) {
       // logic for user details validation can go here if needed
       setCurrentPaymentStep(2);
    } else if (currentPaymentStep === 2) {
       // logic for payment details validation
       console.log("Card details entered, proceeding to OTP.");
       setCurrentPaymentStep(3);
    }
  };

  const handleBack = () => {
    if (currentPaymentStep > 1) {
      setCurrentPaymentStep(currentPaymentStep - 1);
    } else {
      onBack(); // Go back to the previous main form step
    }
  };

  const handleVerify = () => {
    setIsProcessing(true);
    console.log("Verifying OTP and submitting application...");
    setTimeout(() => {
        setIsProcessing(false);
        toast({
            title: "Payment Successful!",
            description: "Your payment has been verified."
        });
        onSubmit(); // Call the final form submission
    }, 2000);
  }

  const renderStepContent = () => {
    const formData = getValues();
    switch (currentPaymentStep) {
      case 1:
        return <UserDetailsStep formData={formData} />;
      case 2:
        return <PaymentDetailsStep />;
      case 3:
        return <OtpVerificationStep />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-center">{paymentSteps[currentPaymentStep - 1].title}</h3>
      <div className="min-h-[280px]">
        {renderStepContent()}
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2" />
          Back
        </Button>
        
        {currentPaymentStep < 3 ? (
          <Button type="button" onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
             {currentPaymentStep === 2 ? 'Proceed to Verify' : 'Next'}
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
                    Verify & Pay €116.00
                </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
