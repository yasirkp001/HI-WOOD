"use client";

import React, { useState } from "react";
import { validatePhoneNumber } from "@/utils/phoneValidation";

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

export const COUNTRIES: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", dialCode: "+974" },
  { code: "OM", name: "Oman", flag: "🇴🇲", dialCode: "+968" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", dialCode: "+965" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", dialCode: "+973" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" }
];

interface InternationalPhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  phoneError: string;
  setPhoneError: (error: string) => void;
  placeholder?: string;
  className?: string;
  inputStyleClass?: string; // Additional classes for custom styled inputs
  isTransparent?: boolean;
}

export default function InternationalPhoneInput({
  value,
  onChange,
  phoneError,
  setPhoneError,
  placeholder = "Phone Number",
  className = "",
  inputStyleClass = "",
  isTransparent = false
}: InternationalPhoneInputProps) {
  // Try to parse the initial country code from the value
  const getInitialCountry = () => {
    if (value.startsWith("+")) {
      const match = COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (match) return match;
    }
    return COUNTRIES[0]; // Default to India 🇮🇳
  };

  const [selectedCountry, setSelectedCountry] = useState<Country>(getInitialCountry());
  const [localNumber, setLocalNumber] = useState("");

  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value.startsWith(selectedCountry.dialCode)) {
      const remainder = value.slice(selectedCountry.dialCode.length).trim();
      setLocalNumber(remainder);
    } else {
      const matchingCountry = COUNTRIES.find((c) => value.startsWith(c.dialCode));
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
        setLocalNumber(value.slice(matchingCountry.dialCode.length).trim());
      } else {
        setLocalNumber(value);
      }
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = COUNTRIES.find((c) => c.code === e.target.value);
    if (country) {
      setSelectedCountry(country);
      const fullNumber = `${country.dialCode} ${localNumber.trim()}`;
      onChange(fullNumber);

      const validation = validatePhoneNumber(fullNumber);
      if (localNumber) {
        setPhoneError(validation.error || "");
      } else {
        setPhoneError("");
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep digits and standard formatting symbols on typing
    const rawVal = e.target.value.replace(/[^0-9\s\-()]/g, "");
    setLocalNumber(rawVal);

    const fullNumber = `${selectedCountry.dialCode} ${rawVal.trim()}`;
    onChange(fullNumber);

    const validation = validatePhoneNumber(fullNumber);
    if (rawVal) {
      setPhoneError(validation.error || "");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className={`flex items-center gap-1 w-full ${
        isTransparent 
          ? `border-b ${phoneError ? 'border-red-500' : 'border-black/20'}` 
          : `px-4 bg-neutral-50 border ${phoneError ? 'border-red-500' : 'border-neutral-200'} rounded-2xl focus-within:border-primary/50 transition-all`
      }`}>
        
        {/* Country Flag & Code Selection */}
        <div className="relative flex items-center shrink-0 pr-2 py-3">
          <span className="text-lg mr-1 select-none pointer-events-none">{selectedCountry.flag}</span>
          <span className="text-xs font-bold text-neutral-600 select-none mr-1">{selectedCountry.dialCode}</span>
          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            title="Select Country Code"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-white text-neutral-900">
                {c.flag} {c.name} ({c.dialCode})
              </option>
            ))}
          </select>
          {/* Subtle separator */}
          <span className="h-5 w-[1px] bg-neutral-300 ml-2"></span>
        </div>

        {/* Local Number Input */}
        <input
          type="tel"
          placeholder={placeholder}
          value={localNumber}
          onChange={handlePhoneChange}
          required
          className={`w-full bg-transparent focus:outline-none text-neutral-900 py-3.5 border-none ${inputStyleClass}`}
        />
      </div>

      {phoneError && (
        <span className="text-red-500 text-[10px] font-semibold mt-1 block tracking-wide">
          {phoneError}
        </span>
      )}
    </div>
  );
}
