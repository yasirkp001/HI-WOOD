/**
 * Utility functions for client-side Cookie management and form data pre-filling
 */

export function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/; SameSite=Lax; Secure";
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

export function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure';
}

// Check if cookie consent is accepted
export function isCookieConsentAccepted(): boolean {
  return getCookie("hiwood_cookie_consent") === "accepted";
}

// Save user preferences if allowed
export function saveUserDataToCookies(name: string, phone: string, email?: string) {
  if (!isCookieConsentAccepted()) return;
  if (name) setCookie("hiwood_user_name", name);
  if (phone) setCookie("hiwood_user_phone", phone);
  if (email) setCookie("hiwood_user_email", email);
}

// Retrieve pre-fill user preferences
export function getUserDataFromCookies() {
  return {
    name: getCookie("hiwood_user_name") || "",
    phone: getCookie("hiwood_user_phone") || "",
    email: getCookie("hiwood_user_email") || "",
  };
}
