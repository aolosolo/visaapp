import { PlaneTakeoff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VisaApplicationForm } from '@/components/visa-application-form';
import { ServiceSelection } from '@/components/service-selection';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-5xl">
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

        <Tabs defaultValue="application" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-primary/10 p-1 h-auto">
            <TabsTrigger value="application" className="text-base py-2">Application Form</TabsTrigger>
            <TabsTrigger value="packages" className="text-base py-2">Service Packages</TabsTrigger>
          </TabsList>
          <TabsContent value="application" className="mt-6">
            <VisaApplicationForm />
          </TabsContent>
          <TabsContent value="packages" className="mt-6">
            <ServiceSelection />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="text-center p-4 text-muted-foreground mt-8 text-sm">
        © {new Date().getFullYear()} VisaApply. All Rights Reserved.
      </footer>
    </div>
  );
}
