
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { VisaApplicationForm } from '@/components/visa-application-form';
import { VisaPreApplication } from '@/components/visa-pre-application';
import { VisaConfirmation } from '@/components/visa-confirmation';
import type { VisaDetails } from '@/components/visa-pre-application';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type AppStep = 'pre-application' | 'confirmation' | 'application';

export default function Home() {
  const [appStep, setAppStep] = useState<AppStep>('pre-application');
  const [visaDetails, setVisaDetails] = useState<VisaDetails | null>(null);
  const { toast } = useToast();

  const handlePreApplicationContinue = (data: VisaDetails) => {
    setVisaDetails(data);
    setAppStep('confirmation');
  };

  const handleConfirmation = () => {
    setAppStep('application');
  };
  
  const handleEditDetails = () => {
    setAppStep('pre-application');
  }

  const handleTestPay = () => {
    toast({
      title: "Test Payment",
      description: "Processing test payment of €1.00",
    });
    // In a real application, you would integrate a payment gateway here.
    console.log("Test payment initiated.");
  }

  const renderStep = () => {
    switch(appStep) {
      case 'pre-application':
        return <VisaPreApplication onContinue={handlePreApplicationContinue} />;
      case 'confirmation':
        return <VisaConfirmation visaDetails={visaDetails!} onConfirm={handleConfirmation} onEdit={handleEditDetails} />;
      case 'application':
        return <VisaApplicationForm visaDetails={visaDetails!} />;
      default:
        return <VisaPreApplication onContinue={handlePreApplicationContinue} />;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="inline-flex items-center justify-center gap-3">
              <Image 
                src="https://www.driftwoodjournals.com/s/img/wp-content/uploads/2020/05/ETIAS-Visa-Waiver.jpg"
                alt="VisaApply Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
                VisaApply
              </h1>
            </div>
             <Button onClick={handleTestPay} variant="destructive">Test Pay €1</Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Your streamlined visa application process starts here.
          </p>
        </header>

        {renderStep()}

      </main>
      <footer className="text-center p-4 text-muted-foreground mt-8 text-sm">
        © {new Date().getFullYear()} VisaApply. All Rights Reserved.
      </footer>
    </div>
  );
}
