"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cookie, X, Check } from "lucide-react";
import { getCookie, setCookie } from "@/utils/cookieUtils";
import { usePathname } from "next/navigation";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const pathname = usePathname();

  // Banner visibility is resolved in deferred tasks so the update lands after
  // hydration instead of cascading a sync re-render on every navigation.
  useEffect(() => {
    const consent = getCookie("hiwood_cookie_consent");
    const targetPages = ["/contact", "/booking", "/custom-furniture"];
    const shouldShow = targetPages.includes(pathname) && !consent;

    const renderTimer = setTimeout(() => setIsRendered(shouldShow), 0);
    const visibleTimer = setTimeout(() => setIsVisible(shouldShow), 50);
    return () => {
      clearTimeout(renderTimer);
      clearTimeout(visibleTimer);
    };
  }, [pathname]);

  const handleAccept = () => {
    setCookie("hiwood_cookie_consent", "accepted", 365);
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 300); // Wait for transition to finish
  };

  const handleDecline = () => {
    setCookie("hiwood_cookie_consent", "declined", 365);
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 300); // Wait for transition to finish
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden pointer-events-auto transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Dark Glassmorphic Backdrop */}
      <div
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => setIsRendered(false), 300);
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Premium Centered Popup Panel */}
      <div
        className={`relative bg-neutral-900 border border-white/10 rounded-[40px] p-8 md:p-10 max-w-lg w-full shadow-2xl text-left overflow-hidden group transition-all duration-300 transform ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Ambient Background Radial Gradient Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => setIsRendered(false), 300);
          }}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all border border-white/5 cursor-pointer"
          aria-label="Close popup"
        >
          <X size={16} />
        </button>

        {/* Cookie & Security Icon */}
        <div className="w-16 h-16 rounded-[24px] bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-8 relative">
          <Cookie size={32} />
          <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-neutral-900 animate-ping"></div>
        </div>

        {/* Title & Info */}
        <h3 className="text-white text-2xl font-black uppercase tracking-wider flex items-center gap-3 [font-family:Montserrat,sans-serif]">
          Privacy & Cookies Policy
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mt-4 font-medium">
          Welcome to **HI WOOD Palazhi**. We use premium client cookies to securely autofill your Name, Email, and Phone number across our forms, saving you time when placing custom orders or requesting quote reviews.
        </p>

        {/* Rights & Copyright info */}
        <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <ShieldCheck size={12} /> All Rights Reserved
          </p>
          <p className="text-white/50 text-xs font-medium leading-relaxed">
            © {new Date().getFullYear()} HI WOOD Palazhi, Kozhikode. By clicking Accept, you consent to our secure, local cookie configuration.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleDecline}
            className="flex-1 py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-4 px-6 bg-primary hover:bg-primary/95 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check size={14} /> Accept & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
