
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface UserDetailsStepProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    homeAddress: string;
    nationality: string;
    dob: Date;
  };
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

export function UserDetailsStep({ formData }: UserDetailsStepProps) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Review Your Information</CardTitle>
        <CardDescription>
          Please ensure all details are correct before proceeding to payment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}
