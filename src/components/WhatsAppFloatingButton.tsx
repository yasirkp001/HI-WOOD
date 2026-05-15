"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppFloatingButton = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918086687342";
  const message =
    "Hi Hi Wood! I'm interested in your custom furniture. Can we discuss a design?";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-[1000] hidden md:block"
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center group"
      >
        {/* Animated outer ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>

        {/* Main button */}
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 relative">
          <MessageSquare size={28} />

          {/* Label tooltip */}
          <div className="absolute right-full mr-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">
              Chat on WhatsApp
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default WhatsAppFloatingButton;
