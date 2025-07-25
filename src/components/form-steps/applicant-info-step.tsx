
"use client";

import { useFormContext } from "react-hook-form";
import { User, Globe, Users, Heart } from "lucide-react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

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

export function ApplicantInfoStep() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
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
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
