"use client";

import React, { useState } from "react";
import { Check, Star } from "lucide-react";
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
    id: "standard",
    name: "Standard",
    price: "$199",
    description: "For the essential traveler.",
    features: [
      "Application review",
      "Standard processing time",
      "Email support",
    ],
    isPopular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$349",
    description: "Our most popular choice.",
    features: [
      "Everything in Standard",
      "Expedited processing",
      "Document pre-check",
      "Phone & email support",
    ],
    isPopular: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "$599",
    description: "For a seamless experience.",
    features: [
      "Everything in Premium",
      "Dedicated case manager",
      "Appointment scheduling",
      "24/7 priority support",
    ],
    isPopular: false,
  },
];

export function ServiceSelection() {
  const [selectedService, setSelectedService] = useState("premium");
  const { toast } = useToast();

  const handleContinue = () => {
    const service = services.find(s => s.id === selectedService);
    toast({
      title: "Package Selected!",
      description: `You have selected the ${service?.name} package.`,
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Select Your Service Package</CardTitle>
        <CardDescription>
          Choose the package that best suits your needs for a hassle-free process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedService}
          onValueChange={setSelectedService}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <div key={service.id} className="relative">
              <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
              <Label
                htmlFor={service.id}
                className="block cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary/50"
              >
                <Card className="border-0 shadow-none">
                  {service.isPopular && (
                    <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      <Star className="h-4 w-4" /> Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-primary">{service.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
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
      </CardContent>
      <CardFooter className="flex-col items-center gap-4">
        <Button onClick={handleContinue} className="w-full md:w-1/2 bg-accent hover:bg-accent/90 text-accent-foreground">
          Continue with Selected Package
        </Button>
      </CardFooter>
    </Card>
  );
}
