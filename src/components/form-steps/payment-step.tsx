
"use client";

import { CreditCard, Landmark, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function PaymentStep() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
          <RadioGroup defaultValue="card" className="grid grid-cols-1 gap-4">
            <div>
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex items-center justify-start gap-4 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <CreditCard className="h-6 w-6" />
                Credit/Debit Card
              </Label>
            </div>
            <div>
              <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
              <Label
                htmlFor="bank"
                className="flex items-center justify-start gap-4 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Landmark className="h-6 w-6" />
                Bank Transfer
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Card className="bg-primary/5 border-primary/20 flex flex-col">
          <CardHeader>
            <CardTitle>Secure Payment</CardTitle>
            <CardDescription>
              Finalize your application by completing the payment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Visa Service Fee</span>
              <span className="text-2xl font-bold text-primary">€116.00</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">This fee is non-refundable.</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Lock className="mr-2" />
              Pay Visa Fees
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By clicking "Pay Visa Fees", you agree to our terms of service.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
