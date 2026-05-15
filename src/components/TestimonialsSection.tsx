import React from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "STEFANIE RASHFORD",
      text: "The quality of the timber we received was exceptional. The HI WOOD team was professional, and the precision milling exceeded our expectations for our architectural project. Highly recommended.",
      image: "/images/testimonial-1.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "PATRIC STONE",
      text: "Service was exceptional, and it's clear that you have a genuine passion for what you do. The attention to detail and willingness to personalize the experience made it truly memorable.",
      image: "/images/testimonial-2.jpg",
      rating: 5,
      featured: true
    },
    {
      id: 3,
      name: "HUGO JAMES",
      text: "The work done was outstanding! The dedication and hard work put into it were evident and greatly appreciated. The level of skill and expertise demonstrated was truly impressive.",
      image: "/images/testimonial-3.jpg",
      rating: 5,
    }
  ];

  return (
    <section className="w-full bg-white py-24 px-4 md:px-8">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className={`flex flex-col items-center text-center p-10 md:p-14 rounded-[2rem] transition-all duration-300 ${
                item.featured ? 'bg-[#F2F1EA]' : 'bg-transparent'
              }`}
            >
              {/* Quote Icon */}
              <div className="text-primary mb-8">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                  <path d="M0 24V10.6667C0 4.26667 4.26667 0 10.6667 0V5.33333C7.11111 5.33333 5.33333 7.11111 5.33333 10.6667H10.6667V24H0ZM21.3333 24V10.6667C21.3333 4.26667 25.6 0 32 0V5.33333C28.4444 5.33333 26.6667 7.11111 26.6667 10.6667H32V24H21.3333Z" />
                </svg>
              </div>

              {/* Text */}
              <p className="text-[#666666] italic text-sm md:text-base leading-relaxed mb-10 max-w-[280px]">
                &quot;{item.text}&quot;
              </p>

              {/* Profile */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white shadow-sm">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h4 className="text-[#1A1A1A] font-bold text-xs tracking-widest uppercase mb-2">
                  {item.name}
                </h4>
                {/* Rating Stars */}
                <div className="flex gap-1 text-accent">
                  {[...Array(item.rating)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Dots */}
        <div className="flex justify-center items-center gap-6">
          <div className="relative flex items-center justify-center w-4 h-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
            <div className="absolute w-6 h-6 rounded-full border border-accent/40"></div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
