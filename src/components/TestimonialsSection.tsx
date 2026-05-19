"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const testimonials = [
    // Page 1 (0, 1, 2)
    { id: 1, rating: 5, featured: false, text: "The premium teak logs we sourced from HI WOOD for our resort project were of flawless grain quality. Millimeter-accurate vertical band sawing saved us weeks of refining. Incredible craftsmanship!" },
    { id: 2, rating: 5, featured: true, text: "Bespoke rosewood dining table delivered to Calicut HQ is a work of art. The seasoning process is top-notch; no swelling or warp despite the high monsoon humidity." },
    { id: 3, rating: 5, featured: false, text: "Our structural timber beams were custom milled, treated, and delivered right on schedule by their heavy-duty logistics fleet. Exceptionally professional!" },
    // Page 2 (3, 4, 5)
    { id: 4, rating: 5, featured: false, text: "The kiln-drying technology they use is superior. Every piece of mahogany wood has perfect moisture level (under 12%), making it incredibly stable for interior paneling." },
    { id: 5, rating: 5, featured: true, text: "Extremely satisfied with the custom-made kitchen cabinetry timber. High-density wood selection and superb grain alignment make all the difference." },
    { id: 6, rating: 5, featured: false, text: "From government depot selection to vertical band sawing, their sawyers understand timber like no one else. Truly the finest sawmill in Kerala." },
    // Page 3 (6, 7, 8)
    { id: 7, rating: 5, featured: false, text: "The wood experience center in Palazhi is spectacular. Seeing the massive seasoned logs and premium grain displays made it easy to select the perfect wood for our home." },
    { id: 8, rating: 5, featured: true, text: "Their logistics express delivery was flawless. Highly delicate custom-carved teak pillars arrived without a single scratch, securely fastened." },
    { id: 9, rating: 5, featured: false, text: "Outstanding consultation for our timber warehouse design. Their team provided structural specs, load calculations, and pristine wood grading." },
    // Page 4 (9, 10, 11)
    { id: 10, rating: 5, featured: false, text: "HI WOOD provides the absolute highest standard in artisanal woodworking timber. The grain contrast on the seasoned walnut wood is simply breathtaking." },
    { id: 11, rating: 5, featured: true, text: "Exceptional vertical saw cuts! They managed to process massive logs into highly thin architectural boards with zero wastage. Highly recommended." },
    { id: 12, rating: 5, featured: false, text: "A brand that represents the soul of fine timber. Their commitment to seasoned durability and precise dimensions is why we source 100% of our wood from them." }
  ];

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Group testimonials into pages of 3
  const pages = [
    testimonials.slice(0, 3),
    testimonials.slice(3, 6),
    testimonials.slice(6, 9),
    testimonials.slice(9, 12)
  ];

  return (
    <section className="w-full bg-white py-28 px-4 md:px-8 overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-[#1A1A1A] text-4xl md:text-5xl font-bold uppercase tracking-tight [font-family:Montserrat,Manrope,sans-serif]">
            CUSTOMERS&apos; EXPERIENCE
          </h2>
        </div>

        {/* Carousel Container (with overflow-hidden) */}
        <div className="w-full overflow-hidden mb-16 relative">
          <motion.div
            className="flex flex-row flex-nowrap w-[400%]"
            animate={{ x: `-${currentPage * 25}%` }}
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
          >
            {pages.map((pageData, pageIdx) => (
              <div key={pageIdx} className="w-1/4 shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 items-stretch">
                {pageData.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col items-center text-center p-10 md:p-14 rounded-[2.5rem] border border-black/5 hover:border-primary/25 transition-all duration-500 shadow-xs hover:shadow-xl ${
                      item.featured ? 'bg-[#F2F1EA]/85' : 'bg-neutral-50/50'
                    }`}
                  >
                    {/* Quote Icon */}
                    <div className="text-primary mb-8 opacity-80">
                      <svg width="28" height="20" viewBox="0 0 32 24" fill="currentColor">
                        <path d="M0 24V10.6667C0 4.26667 4.26667 0 10.6667 0V5.33333C7.11111 5.33333 5.33333 7.11111 5.33333 10.6667H10.6667V24H0ZM21.3333 24V10.6667C21.3333 4.26667 25.6 0 32 0V5.33333C28.4444 5.33333 26.6667 7.11111 26.6667 10.6667H32V24H21.3333Z" />
                      </svg>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-neutral-600 italic text-sm md:text-[15px] leading-relaxed mb-8 flex-grow">
                      &quot;{item.text}&quot;
                    </p>

                    {/* Profile Area */}
                    <div className="flex flex-col items-center mt-auto pt-4 border-t border-black/5 w-full">
                      {/* Rating Stars */}
                      <div className="flex gap-1 text-accent">
                        {[...Array(item.rating)].map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
                        Verified Purchase
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Carousel Dots */}
        <div className="flex justify-center items-center gap-6">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className="relative flex items-center justify-center w-6 h-6 focus:outline-none group/dot"
              aria-label={`Go to page ${index + 1}`}
            >
              {/* Dot */}
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                currentPage === index ? 'bg-primary scale-125' : 'bg-black/20 group-hover/dot:bg-primary/50'
              }`} />
              {/* Active Outer Ring */}
              {currentPage === index && (
                <motion.div
                  layoutId="activeCarouselDotRing"
                  className="absolute w-5 h-5 rounded-full border border-primary/45"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
