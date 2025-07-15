
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ApplicantInfoStep } from "@/components/form-steps/applicant-info-step";
import { PassportInfoStep } from "@/components/form-steps/passport-info-step";
import { EmploymentEducationStep } from "@/components/form-steps/employment-education-step";
import { ContactInfoStep } from "@/components/form-steps/contact-info-step";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { VisaDetails } from "@/components/visa-pre-application";

const applicantInfoSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  dob: z.date({ required_error: "A date of birth is required." }),
  nationality: z.string({ required_error: "Please select a nationality." }),
  gender: z.string({ required_error: "Please select a gender." }),
  maritalStatus: z.string({ required_error: "Please select a marital status." }),
});

const passportInfoSchema = z.object({
  passportNumber: z.string().min(6, "Passport number must be at least 6 characters."),
  passportIssueDate: z.date({ required_error: "Passport issue date is required." }),
  passportExpiryDate: z.date({ required_error: "Passport expiry date is required." }),
  passportCountryOfIssue: z.string({ required_error: "Please select a country of issue." }),
});

const employmentEducationSchema = z.object({
  occupation: z.string().min(2, "Occupation is required."),
  employerSchoolName: z.string().min(2, "This field is required."),
  employerSchoolAddress: z.string().min(5, "Address must be at least 5 characters."),
});

const contactInfoSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  homeAddress: z.string().min(10, "Home address must be at least 10 characters."),
});


const formSchema = applicantInfoSchema
  .merge(passportInfoSchema)
  .merge(employmentEducationSchema)
  .merge(contactInfoSchema);


const steps = [
  { id: 1, title: "Applicant Information", schema: applicantInfoSchema, fields: ["fullName", "dob", "nationality", "gender", "maritalStatus"] },
  { id: 2, title: "Passport Information", schema: passportInfoSchema, fields: ["passportNumber", "passportIssueDate", "passportExpiryDate", "passportCountryOfIssue"] },
  { id: 3, title: "Employment / Education", schema: employmentEducationSchema, fields: ["occupation", "employerSchoolName", "employerSchoolAddress"] },
  { id: 4, title: "Contact Information", schema: contactInfoSchema, fields: ["email", "phone", "homeAddress"] },
];

interface VisaApplicationFormProps {
  visaDetails: VisaDetails;
}

export function VisaApplicationForm({ visaDetails }: VisaApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      nationality: visaDetails.citizenship,
      passportNumber: "",
      email: "",
      phone: "",
      occupation: "",
      employerSchoolName: "",
      employerSchoolAddress: "",
      homeAddress: "",
    },
  });

  const handleNext = async () => {
    const currentStepConfig = steps[currentStep - 1];
    if (!currentStepConfig.fields) {
        setCurrentStep(currentStep + 1);
        return;
    }

    const fieldsToValidate = currentStepConfig.fields as (keyof z.infer<typeof formSchema>)[];
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final step, navigate to checkout
        const values = form.getValues();
        console.log({ ...visaDetails, ...values });
        toast({
            title: "Application Ready for Payment",
            description: "Please proceed to pay the visa fee.",
        });
        // Here you might want to save the form data to a state management solution
        // or pass it to the checkout page via query params (for non-sensitive data).
        router.push('/checkout');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / (steps.length + 1)) * 100;

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
        <CardDescription>
          Please fill in your details accurately. All fields are required.
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <FormProvider {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="space-y-8 min-h-[420px]">
            {currentStep === 1 && <ApplicantInfoStep />}
            {currentStep === 2 && <PassportInfoStep />}
            {currentStep === 3 && <EmploymentEducationStep />}
            {currentStep === 4 && <ContactInfoStep />}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2" />
                Back
              </Button>
            ) : <div />}

            <Button type="button" onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {currentStep === steps.length ? "Proceed to Pay Visa Fee" : "Next"}
              <ArrowRight className="ml-2" />
            </Button>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
