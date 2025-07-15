
"use client";

import { useState } from 'react';
import { PlaneTakeoff } from 'lucide-react';
import { VisaApplicationForm } from '@/components/visa-application-form';
import { VisaPreApplication } from '@/components/visa-pre-application';
import { VisaDetails } from '@/components/visa-pre-application';

export default function Home() {
  const [preApplicationData, setPreApplicationData] = useState<VisaDetails | null>(null);

  const handlePreApplicationContinue = (data: VisaDetails) => {
    setPreApplicationData(data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <PlaneTakeoff className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
              VisaApply
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your streamlined visa application process starts here.
          </p>
        </header>

        {!preApplicationData ? (
          <VisaPreApplication onContinue={handlePreApplicationContinue} />
        ) : (
          <VisaApplicationForm visaDetails={preApplicationData} />
        )}

      </main>
      <footer className="text-center p-4 text-muted-foreground mt-8 text-sm">
        © {new Date().getFullYear()} VisaApply. All Rights Reserved.
      </footer>
    </div>
  );
}
