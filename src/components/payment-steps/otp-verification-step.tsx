
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface OtpVerificationStepProps {
  onVerify: (otp: string) => void;
  isProcessing: boolean;
}

export function OtpVerificationStep({ onVerify, isProcessing }: OtpVerificationStepProps) {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(180);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleResend = () => {
    setTimer(180);
    // In a real app, you would also trigger a resend OTP API call here
  };

  const handleVerifyClick = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };
  
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="space-y-4 max-w-xs mx-auto">
            <Label htmlFor="otp">Enter OTP</Label>
            <p className="text-sm text-muted-foreground pb-2">
                A One-Time Password has been sent to your registered mobile number.
            </p>
            <Input
                id="otp"
                placeholder="_ _ _ _ _ _"
                className="text-center text-2xl tracking-[0.5em] font-mono"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
            />
            <div className="text-sm text-muted-foreground">
                {timer > 0 ? (
                    <span>Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                ) : (
                    <button onClick={handleResend} className="text-accent hover:underline">
                        Resend OTP
                    </button>
                )}
            </div>

            <Button onClick={handleVerifyClick} disabled={isProcessing || otp.length !== 6} className="w-full">
                {isProcessing ? <Loader2 className="animate-spin" /> : "Verify & Pay"}
            </Button>
        </div>
    </div>
  );
}
