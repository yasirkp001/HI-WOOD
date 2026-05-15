"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-[100] hidden md:flex"
        >
          <button 
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-14 h-14 bg-[#121212] rounded-full group transition-transform duration-300 hover:scale-110 shadow-2xl"
            aria-label="Scroll to top"
          >
            {/* Saw Blade border effect */}
            <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-primary opacity-50 group-hover:opacity-100 group-hover:animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-1 rounded-full border-[2px] border-primary"></div>
            
            {/* Up Arrow */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31E24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="z-10 relative">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
