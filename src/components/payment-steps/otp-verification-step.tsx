
"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function OtpVerificationStep() {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="space-y-2 max-w-xs mx-auto">
            <Label htmlFor="otp">Enter OTP</Label>
            <p className="text-sm text-muted-foreground pb-2">
                A One-Time Password has been sent to your registered mobile number.
            </p>
            <Input
                id="otp"
                placeholder="_ _ _ _ _ _"
                className="text-center text-2xl tracking-[0.5em] font-mono"
            />
            <button className="text-sm text-accent hover:underline pt-2">
                Resend OTP
            </button>
        </div>
    </div>
  );
}
