
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { VisaApplicationForm } from '@/components/visa-application-form';
import { VisaPreApplication } from '@/components/visa-pre-application';
import { VisaConfirmation } from '@/components/visa-confirmation';
import type { VisaDetails } from '@/components/visa-pre-application';

type AppStep = 'pre-application' | 'confirmation' | 'application';

export default function Home() {
  const [appStep, setAppStep] = useState<AppStep>('pre-application');
  const [visaDetails, setVisaDetails] = useState<VisaDetails | null>(null);

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
          <div className="inline-flex items-center justify-center gap-3 mb-2">
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
