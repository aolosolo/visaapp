
"use client";

import { useFormContext } from "react-hook-form";
import { Briefcase, Building, MapPin } from "lucide-react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function EmploymentEducationStep() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input placeholder="e.g., Software Engineer, Doctor, Student" {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="employerSchoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer / School Name</FormLabel>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input placeholder="e.g., Google, Harvard University" {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
       <FormField
        control={control}
        name="employerSchoolAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employer / School Address</FormLabel>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <FormControl>
                <Input placeholder="123 Main St, Anytown, USA" {...field} className="pl-10" />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
