/**
 * Reusable International Phone Number Validation Utility for HI WOOD
 * Supports phone numbers from all countries globally following the E.164 standard.
 * Enforces strict mobile dialing structures for India (+91) and the Gulf region (UAE, Saudi).
 */

export interface PhoneValidationResult {
  isValid: boolean;
  cleanedNumber: string;
  error: string | null;
}

/**
 * Validates, cleans, and auto-formats phone numbers.
 * 
 * Rules:
 * 1. Pre-cleaning check for alphabets and invalid symbols.
 * 2. Cleans spaces, dashes, parentheses, etc.
 * 3. Enforces strict rules for India (+91):
 *    - Auto-corrects 10-digit numbers starting with 6,7,8,9 by prepending "+91".
 *    - If starts with +91 or 91 (followed by 10 digits), verifies exactly 10 mobile digits starting with 6,7,8,9.
 * 4. Enforces rules for Gulf region (UAE +971, Saudi Arabia +966):
 *    - UAE mobile numbers must have exactly 9 digits after country code.
 *    - Saudi mobile numbers must have exactly 9 digits after country code.
 * 5. General E.164 fallback for other countries (7 to 15 digits).
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

  // 2. Pre-clean checks
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

  // Check country code leading '+' prefix format
  if (trimmed.includes("+") && !trimmed.startsWith("+")) {
    return {
      isValid: false,
      cleanedNumber: trimmed,
      error: "The '+' country code prefix must be at the very start of the phone number."
    };
  }

  // Pre-clean: strip all non-digit characters
  const hasPlus = trimmed.startsWith("+");
  const digitsOnly = trimmed.replace(/[^0-9]/g, "");

  // 3. STRICT LOCAL INDIAN MOBILE AUTO-CORRECT
  // If the user entered exactly 10 digits without any country code prefix
  if (!hasPlus && digitsOnly.length === 10) {
    const firstDigit = digitsOnly.charAt(0);
    if (!["6", "7", "8", "9"].includes(firstDigit)) {
      return {
        isValid: false,
        cleanedNumber: digitsOnly,
        error: "Indian mobile numbers must start with 6, 7, 8, or 9."
      };
    }
    // Auto-prepend +91 (India) country code
    return {
      isValid: true,
      cleanedNumber: `+91${digitsOnly}`,
      error: null
    };
  }

  // Format with/without '+' prefix
  const cleaned = hasPlus ? `+${digitsOnly}` : digitsOnly;
  
  // 4. STRICT INDIAN MOBILE COUNTRY CODE PLAN (+91)
  const isIndiaWithPlus = cleaned.startsWith("+91");
  const isIndiaNoPlus = !hasPlus && cleaned.startsWith("91") && digitsOnly.length === 12;

  if (isIndiaWithPlus || isIndiaNoPlus) {
    const mobileDigits = digitsOnly.substring(2);
    if (mobileDigits.length !== 10) {
      return {
        isValid: false,
        cleanedNumber: cleaned,
        error: `Indian mobile numbers must have exactly 10 digits after country code (got ${mobileDigits.length}).`
      };
    }
    const firstDigit = mobileDigits.charAt(0);
    if (!["6", "7", "8", "9"].includes(firstDigit)) {
      return {
        isValid: false,
        cleanedNumber: cleaned,
        error: "Indian mobile numbers must start with 6, 7, 8, or 9."
      };
    }
    return {
      isValid: true,
      cleanedNumber: `+91${mobileDigits}`,
      error: null
    };
  }

  // 5. UAE DIALING PLAN (+971)
  const isUaeWithPlus = cleaned.startsWith("+971");
  const isUaeNoPlus = !hasPlus && cleaned.startsWith("971") && (digitsOnly.length === 12 || digitsOnly.length === 11);
  if (isUaeWithPlus || isUaeNoPlus) {
    const mobileDigits = digitsOnly.substring(3);
    // UAE standard mobile: 9 digits (starts with 5)
    if (mobileDigits.length !== 9) {
      return {
        isValid: false,
        cleanedNumber: cleaned,
        error: `UAE mobile numbers must have exactly 9 digits after country code (got ${mobileDigits.length}).`
      };
    }
    return {
      isValid: true,
      cleanedNumber: `+971${mobileDigits}`,
      error: null
    };
  }

  // 6. SAUDI ARABIA DIALING PLAN (+966)
  const isSaudiWithPlus = cleaned.startsWith("+966");
  const isSaudiNoPlus = !hasPlus && cleaned.startsWith("966") && (digitsOnly.length === 12 || digitsOnly.length === 11);
  if (isSaudiWithPlus || isSaudiNoPlus) {
    const mobileDigits = digitsOnly.substring(3);
    // Saudi standard mobile: 9 digits
    if (mobileDigits.length !== 9) {
      return {
        isValid: false,
        cleanedNumber: cleaned,
        error: `Saudi mobile numbers must have exactly 9 digits after country code (got ${mobileDigits.length}).`
      };
    }
    return {
      isValid: true,
      cleanedNumber: `+966${mobileDigits}`,
      error: null
    };
  }

  // 7. GENERAL GLOBAL E.164 FALLBACK
  const digitCount = digitsOnly.length;
  if (digitCount < 7) {
    return {
      isValid: false,
      cleanedNumber: cleaned,
      error: `Phone number is too short. International formats must contain at least 7 digits (got ${digitCount}).`
    };
  }

  if (digitCount > 15) {
    return {
      isValid: false,
      cleanedNumber: cleaned,
      error: `Phone number is too long. International formats cannot exceed 15 digits (got ${digitCount}).`
    };
  }

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
    { input: "8086687342", expectedValid: true }, // Local India 10-digit (Auto +91)
    { input: "+91 80866 87342", expectedValid: true }, // India with prefix (Valid)
    { input: "+91 50866 87342", expectedValid: false }, // India starting with 5 (Invalid)
    { input: "+971 50 123 4567", expectedValid: true }, // UAE (9 digits, Valid)
    { input: "+971 50 123", expectedValid: false }, // UAE (too short, Invalid)
    { input: "+966 50 123 4567", expectedValid: true }, // Saudi Arabia (9 digits, Valid)
    { input: "+1 (202) 555-0143", expectedValid: true }, // USA (Valid E.164 fallback)
    { input: "12345", expectedValid: false }, // Too short (< 7 digits)
  ];

  console.log("=== RUNNING ADVANCED PHONE VALIDATION TESTS ===");
  tests.forEach(({ input, expectedValid }, idx) => {
    const res = validatePhoneNumber(input);
    const passed = res.isValid === expectedValid;
    console.log(
      `Test #${idx + 1} | Input: "${input}" | Valid: ${res.isValid} | Error: "${res.error}" | Cleaned: "${res.cleanedNumber}" | Passed: ${passed ? "✅" : "❌"}`
    );
  });
  console.log("====================================================");
};
