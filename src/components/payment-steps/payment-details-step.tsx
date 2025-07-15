
"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { CreditCard, User, Calendar, Lock, ArrowRight, Loader2 } from 'lucide-react';

const paymentSchema = z.object({
  cardName: z.string().min(3, { message: "Name is required" }),
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(16, { message: "Card number must be 16 digits" })
    .regex(/^\d+$/, { message: "Must be only digits" }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Use MM/YY format" }),
  cvv: z.string()
    .min(3, { message: "CVV must be 3-4 digits" })
    .max(4, { message: "CVV must be 3-4 digits" })
    .regex(/^\d+$/, { message: "Must be only digits" }),
});

interface PaymentDetailsStepProps {
    onNext: (data: z.infer<typeof paymentSchema>) => void;
    isProcessing: boolean;
}

export function PaymentDetailsStep({ onNext, isProcessing }: PaymentDetailsStepProps) {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    }
  });

  const onSubmit = (data: z.infer<typeof paymentSchema>) => {
    onNext(data);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    form.setValue('expiryDate', value, { shouldValidate: true });
  };


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
            <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input id="cardName" placeholder="John Doe" className="pl-10" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                    <FormItem>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="pl-10" {...field} maxLength={16} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                    <Input 
                                      id="expiryDate" 
                                      placeholder="MM/YY" 
                                      className="pl-10" 
                                      {...field}
                                      onChange={handleExpiryDateChange}
                                      maxLength={5}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                    <Input id="cvv" placeholder="123" className="pl-10" {...field} maxLength={4} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="pt-4">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isProcessing}>
                    {isProcessing ? (
                        <Loader2 className="mr-2 animate-spin" />
                    ) : (
                        <Lock className="mr-2" />
                    )}
                    Proceed to Verify
                </Button>
            </div>
        </form>
    </Form>
  );
}
