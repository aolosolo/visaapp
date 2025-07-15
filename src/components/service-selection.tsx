"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    id: "etias",
    name: "Europe ETIAS",
    price: "€106.00",
    feeText: "Government fees ARE included",
    features: [
      "Your personal visa consultant",
      "24/7 limitless support, anywhere",
      "User-friendly digital tools that ensures high approval rate",
      "Decades of experience",
      "One-time courtesy reprocessing",
    ],
    isPopular: false,
  },
  {
    id: "service",
    name: "Europe Visa Service",
    price: "€175.00",
    feeText: "Government fees NOT included",
    features: [
      "All the perks of a personal visa consultant",
      "24/7 limitless support, anywhere in the world",
      "User-friendly digital tools",
      "Decades of experience",
      "Application review, invitation letter, interview guide",
      "Many more...",
    ],
    isPopular: true,
  },
  {
    id: "vip",
    name: "Europe VISA VIP",
    price: "€495.00",
    feeText: "Government fees NOT included",
    features: [
      "Private 30-minute consultation with a real ex-visa officer",
      "Your personal visa advisor who knows how to stay ahead of potential obstacles and avoids any unnecessary delays",
      "24/7 limitless support, anywhere in the world",
      "User-friendly digital tools",
      "Application review, invitation letter, interview guide",
      "Many more...",
    ],
    isPopular: false,
  },
];

export function ServiceSelection() {
  const [selectedService, setSelectedService] = useState("service");
  const { toast } = useToast();

  const handleContinue = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    toast({
      title: "Package Selected!",
      description: `You have selected the ${service?.name} package.`,
    });
  };

  return (
    <RadioGroup
      value={selectedService}
      onValueChange={setSelectedService}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
    >
      {services.map((service) => (
        <div key={service.id} className="relative h-full">
          <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
          <Label
            htmlFor={service.id}
            className={cn(
              "block cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm transition-all h-full",
              "peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary/50"
            )}
          >
            <Card className="border-0 shadow-none flex flex-col h-full">
              {service.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white">
                  BEST VALUE
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
                <p className="text-4xl font-bold text-primary pt-2">{service.price}</p>
                <CardDescription>{service.feeText}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Button 
                  onClick={() => handleContinue(service.id)} 
                  className={cn(
                    "w-full mt-4 mb-6",
                    service.isPopular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-transparent border-primary text-primary hover:bg-primary/5 border"
                  )}
                >
                  Start now!
                </Button>

                <p className="font-semibold mb-4">Features included in the package:</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
