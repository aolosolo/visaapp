
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface UserDetailsStepProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    homeAddress: string;
    nationality: string;
    dob: Date;
    [key: string]: any; // Allow other properties
  };
  onNext: () => void;
}

const countryDisplayMap: { [key: string]: string } = {
  pk: 'Pakistan',
  af: 'Afghanistan',
  bd: 'Bangladesh',
  cn: 'China',
  in: 'India',
  id: 'Indonesia',
  ir: 'Iran',
  iq: 'Iraq',
  jp: 'Japan',
  kz: 'Kazakhstan',
  my: 'Malaysia',
  mn: 'Mongolia',
  np: 'Nepal',
  om: 'Oman',
  ph: 'Philippines',
  qa: 'Qatar',
  sa: 'Saudi Arabia',
  sg: 'Singapore',
  kr: 'South Korea',
  lk: 'Sri Lanka',
  sy: 'Syria',
  th: 'Thailand',
  tr: 'Turkey',
  ae: 'United Arab Emirates',
  vn: 'Vietnam',
  usa: "United States",
  ca: "Canada",
  gb: "United Kingdom",
  au: "Australia",
  other: "Other"
};

export function UserDetailsStep({ formData, onNext }: UserDetailsStepProps) {
  const isTestPayment = !formData.fullName;
  const visaFee = isTestPayment ? 1.00 : 106.00;

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Review Your Information</CardTitle>
        <CardDescription>
          Please ensure all details are correct before proceeding to payment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isTestPayment ? (
          <div className="text-center p-8 bg-muted/50 rounded-lg">
            <p className="text-lg">This is a <Badge variant="destructive">Test Payment</Badge>.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">Full Name</p>
              <p>{formData.fullName}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Date of Birth</p>
              <p>{format(new Date(formData.dob), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Nationality</p>
              <p>{countryDisplayMap[formData.nationality] || formData.nationality}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Email</p>
              <p>{formData.email}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Phone</p>
              <p>{formData.phone}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Address</p>
              <p>{formData.homeAddress}</p>
            </div>
          </div>
        )}

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-lg">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center text-lg">
            <span className="font-medium">Visa Fee:</span>
            <span className="font-bold text-2xl text-primary">€{visaFee.toFixed(2)}</span>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
