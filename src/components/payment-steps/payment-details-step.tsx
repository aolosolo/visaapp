
"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, User, Calendar, Lock } from 'lucide-react';

export function PaymentDetailsStep() {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="cardName">Cardholder Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="cardName" placeholder="John Doe" className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="pl-10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
           <div className="relative">
             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input id="expiryDate" placeholder="MM/YY" className="pl-10" />
           </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
           <div className="relative">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input id="cvv" placeholder="123" className="pl-10" />
           </div>
        </div>
      </div>
    </div>
  );
}
