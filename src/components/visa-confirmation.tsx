
"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { VisaDetails } from "@/components/visa-pre-application";

interface VisaConfirmationProps {
  visaDetails: VisaDetails;
  onConfirm: () => void;
  onEdit: () => void;
}

const visaInfoMap = {
  tourism: {
    stay: "90 Days",
    type: "Schengen Tourist Visa",
    description: "The Schengen Tourist Visa allows you to travel freely within the Schengen Area for up to 90 days within any 180-day period for tourism or visiting purposes.",
  },
  business: {
    stay: "180 Days",
    type: "Schengen Business Visa",
    description: "The Schengen Business Visa is for short-term business-related travel, allowing stays up to 180 days for meetings, conferences, and negotiations.",
  },
  work: {
    stay: "2 Years",
    type: "National Work Visa",
    description: "A National Work Visa (or D-type visa) allows you to stay and work in the designated European country for a period of up to 2 years.",
  },
  study: {
    stay: "4 Years",
    type: "Student Visa",
    description: "The Student Visa is granted for pursuing education in a European institution and is typically valid for the duration of the course, up to 4 years.",
  },
};

export function VisaConfirmation({ visaDetails, onConfirm, onEdit }: VisaConfirmationProps) {
  const { citizenship, travelReason } = visaDetails;
  const info = visaInfoMap[travelReason];
  
  const countryDisplayMap: { [key: string]: string } = {
    usa: "United States",
    canada: "Canada",
    uk: "United Kingdom",
    australia: "Australia",
    other: "Other"
  }


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-8 space-y-6">
        <div className="space-y-4 text-lg">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Your Nationality:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{countryDisplayMap[citizenship] || citizenship}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-accent" onClick={onEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Max Length of Stay:</span>
            <span className="font-semibold">{info.stay}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Recommended Visa Type:</span>
            <span className="font-semibold">{info.type}</span>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-2">
            <h3 className="font-bold text-xl">General information about Visa Type:</h3>
            <p className="text-muted-foreground text-base">
                {info.description}
            </p>
        </div>
      </CardContent>
      <CardFooter className="px-8 pb-8">
        <Button onClick={onConfirm} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-lg">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
