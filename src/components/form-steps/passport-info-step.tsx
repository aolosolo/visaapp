
"use client";

import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { BookUser, Globe } from "lucide-react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PassportInfoStep() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Number</FormLabel>
              <div className="relative">
                <BookUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input placeholder="A12345678" {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passportCountryOfIssue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country of Issue</FormLabel>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passportIssueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Issue Date</FormLabel>
              <FormControl>
                <Input 
                  type="date"
                  {...field}
                  value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                  onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  className="pr-3"
                  max={format(new Date(), 'yyyy-MM-dd')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passportExpiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport Expiry Date</FormLabel>
                <FormControl>
                   <Input 
                      type="date"
                      {...field}
                      value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                      className="pr-3"
                      min={format(new Date(), 'yyyy-MM-dd')}
                   />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
