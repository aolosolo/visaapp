
"use client";

import React, { useState } from "react";
import { PlaneTakeoff, Briefcase, HardHat, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const travelReasons = [
  { id: "tourism", label: "Tourism or Visit", icon: PlaneTakeoff },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "work", label: "Work", icon: HardHat },
  { id: "study", label: "Study", icon: GraduationCap },
];

const asianCountries = [
    { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'af', name: 'Afghanistan', flag: '🇦🇫' },
    { code: 'bd', name: 'Bangladesh', flag: '🇧🇩' },
    { code: 'cn', name: 'China', flag: '🇨🇳' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'ir', name: 'Iran', flag: '🇮🇷' },
    { code: 'iq', name: 'Iraq', flag: '🇮🇶' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'kz', name: 'Kazakhstan', flag: '🇰🇿' },
    { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'mn', name: 'Mongolia', flag: '🇲🇳' },
    { code: 'np', name: 'Nepal', flag: '🇳🇵' },
    { code: 'om', name: 'Oman', flag: '🇴🇲' },
    { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
    { code: 'qa', name: 'Qatar', flag: '🇶🇦' },
    { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
    { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
    { code: 'lk', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: 'sy', name: 'Syria', flag: '🇸🇾' },
    { code: 'th', name: 'Thailand', flag: '🇹🇭' },
    { code: 'tr', name: 'Turkey', flag: '🇹🇷' },
    { code: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'vn', name: 'Vietnam', flag: '🇻🇳' },
];

const otherCountries = [
    { code: 'usa', name: 'United States', flag: '🇺🇸' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'other', name: 'Other', flag: '🏳️' },
]

type TravelReason = "tourism" | "business" | "work" | "study";

export interface VisaDetails {
  citizenship: string;
  multipleCitizenship: boolean;
  travelReason: TravelReason;
}

interface VisaPreApplicationProps {
  onContinue: (details: VisaDetails) => void;
}

export function VisaPreApplication({ onContinue }: VisaPreApplicationProps) {
  const [citizenship, setCitizenship] = useState("");
  const [multipleCitizenship, setMultipleCitizenship] = useState(false);
  const [travelReason, setTravelReason] = useState<TravelReason>("tourism");
  const { toast } = useToast();

  const handleContinue = () => {
    if (!citizenship) {
      toast({
        title: "Citizenship Required",
        description: "Please select your country of citizenship.",
        variant: "destructive",
      });
      return;
    }
    onContinue({
      citizenship,
      multipleCitizenship,
      travelReason,
    });
  };

  const allCountries = [...asianCountries, ...otherCountries];

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">START EUROPE VISA APPLICATION</h2>
        
        <div className="space-y-2">
          <Label htmlFor="citizenship">What is your citizenship?</Label>
          <Select onValueChange={setCitizenship} value={citizenship}>
            <SelectTrigger id="citizenship">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
                {allCountries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="multiple-citizenship" 
            checked={multipleCitizenship}
            onCheckedChange={(checked) => setMultipleCitizenship(Boolean(checked))}
          />
          <Label htmlFor="multiple-citizenship" className="font-normal">
            I have more than one citizenship
          </Label>
        </div>

        <div className="space-y-2">
          <Label>Select reason(s) for travel to Europe:</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {travelReasons.map((reason) => (
              <Label
                key={reason.id}
                htmlFor={reason.id}
                className={cn(
                  "flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer transition-colors",
                  travelReason === reason.id
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                )}
              >
                <input
                  type="radio"
                  id={reason.id}
                  name="travelReason"
                  value={reason.id}
                  checked={travelReason === reason.id}
                  onChange={() => setTravelReason(reason.id as TravelReason)}
                  className="sr-only"
                />
                <reason.icon className="w-8 h-8 mb-2" />
                <span className="text-center text-sm font-medium">{reason.label}</span>
              </Label>
            ))}
          </div>
        </div>

        <Button onClick={handleContinue} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-lg">
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
