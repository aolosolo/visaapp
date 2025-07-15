
"use client";

import { CreditCard, Landmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function PaymentStep() {
  return (
    <div className="space-y-6">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Final Step: Payment</CardTitle>
          <CardDescription>
            Please complete the payment to finalize your visa application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Visa Service Fee</span>
            <span className="text-2xl font-bold text-primary">€116.00</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">This fee is non-refundable.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Payment Method</h3>
        <RadioGroup defaultValue="card" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCard className="mb-3 h-6 w-6" />
              Credit/Debit Card
            </Label>
          </div>
          <div>
            <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
            <Label
              htmlFor="bank"
              className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Landmark className="mb-3 h-6 w-6" />
              Bank Transfer
            </Label>
          </div>
        </RadioGroup>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        By clicking "Pay & Submit Application", you agree to our terms of service.
      </p>
    </div>
  );
}
