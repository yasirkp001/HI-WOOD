/**
 * Reusable International Phone Number Validation Utility for HI WOOD
 * Supports phone numbers from all countries globally following the E.164 standard.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  cleanedNumber: string;
  error: string | null;
}

/**
 * Validates and cleans an international mobile phone number.
 * 
 * Rules based on E.164 standard & Global dialing plans:
 * - Total digit count: between 7 and 15 digits (excluding leading "+")
 * - Supports optional leading "+" country code prefix
 * - Rejects alphabetical characters and invalid symbols
 * - Automatically cleans spaces, dashes, parentheses, and local punctuation
 * 
 * @param phone Raw phone input
 * @returns PhoneValidationResult structured validation response
 */
export function validatePhoneNumber(phone: string): PhoneValidationResult {
  // 1. Check for empty input
  if (!phone || phone.trim() === "") {
    return {
      isValid: false,
      cleanedNumber: "",
      error: "Phone number cannot be empty."
    };
  }

  const trimmed = phone.trim();

  // 2. Check for invalid characters before cleaning up
  // Letters or invalid symbols are rejected early
  const containsLetters = /[a-zA-Z]/g.test(trimmed);
  const containsInvalidSymbols = /[^0-9\s+\-()]/g.test(trimmed);
  if (containsLetters || containsInvalidSymbols) {
    return {
      isValid: false,
      cleanedNumber: trimmed,
      error: "Phone number contains invalid characters. Letters and symbols are not allowed."
    };
  }

  // 3. Check country code leading '+' prefix format
  if (trimmed.includes("+") && !trimmed.startsWith("+")) {
    return {
      isValid: false,
      cleanedNumber: trimmed,
      error: "The '+' country code prefix must be at the very start of the phone number."
    };
  }

  // 4. Clean up input: remove spaces, dashes, parentheses, etc.
  // Preserve optional leading "+" if present at the absolute start
  const hasPlus = trimmed.startsWith("+");
  const digitsOnly = trimmed.replace(/[^0-9]/g, "");
  const cleaned = hasPlus ? `+${digitsOnly}` : digitsOnly;

  // 5. Validate exact digit count (excluding optional "+")
  const digitCount = digitsOnly.length;

  if (digitCount === 0) {
    return {
      isValid: false,
      cleanedNumber: cleaned,
      error: "Phone number must contain digits after cleanup."
    };
  }

  // E.164 recommends max 15 digits. Shortest valid country number plans start around 7 digits.
  if (digitCount < 7) {
    return {
      isValid: false,
      cleanedNumber: cleaned,
      error: `Phone number is too short for international formatting. It must contain at least 7 digits (got ${digitCount}).`
    };
  }

  if (digitCount > 15) {
    return {
      isValid: false,
      cleanedNumber: cleaned,
      error: `Phone number is too long. International phone numbers cannot exceed 15 digits (got ${digitCount}).`
    };
  }

  // 6. Successful validation
  return {
    isValid: true,
    cleanedNumber: cleaned,
    error: null
  };
}

/**
 * Example Test Cases for Global / International Dialing Plans
 */
export const runPhoneValidationTests = () => {
  const tests = [
    { input: "", expectedValid: false },
    { input: "    ", expectedValid: false },
    { input: "aaaakkknnam", expectedValid: false }, // Alphabetical string
    { input: "+91 80866 87342", expectedValid: true }, // India (Valid)
    { input: "+1 (202) 555-0143", expectedValid: true }, // USA (Valid)
    { input: "+44 7911 123456", expectedValid: true }, // UK (Valid)
    { input: "+971 50 123 4567", expectedValid: true }, // UAE (Valid)
    { input: "+966 50 123 4567", expectedValid: true }, // Saudi Arabia (Valid)
    { input: "+960 779-1234", expectedValid: true }, // Maldives (7 digits, Valid)
    { input: "+49 151 12345678", expectedValid: true }, // Germany (Valid)
    { input: "12345", expectedValid: false }, // Too short (< 7 digits)
    { input: "12345678901234567", expectedValid: false }, // Too long (> 15 digits)
  ];

  console.log("=== RUNNING INTERNATIONAL PHONE VALIDATION TESTS ===");
  tests.forEach(({ input, expectedValid }, idx) => {
    const res = validatePhoneNumber(input);
    const passed = res.isValid === expectedValid;
    console.log(
      `Test #${idx + 1} | Input: "${input}" | Valid: ${res.isValid} | Error: "${res.error}" | Cleaned: "${res.cleanedNumber}" | Passed: ${passed ? "✅" : "❌"}`
    );
  });
  console.log("====================================================");
};
