
"use client";

import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { BookUser, Globe } from "lucide-react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const allCountries = [...asianCountries, ...otherCountries];

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
