"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, PlayCircle, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

const transformations = [
  {
    id: 1,
    title: "Raw Log to Luxury Portal",
    description: "A century-old Teak log transformed into a grand entrance door with intricate hand-carvings.",
    before: "/images/project-before-1.jpg",
    after: "/images/project-after-1.jpg",
    category: "Entryways"
  },
  {
    id: 2,
    title: "Rough Slabs to Dining Masterpiece",
    description: "Live-edge Rosewood slabs seasoned and finished into a 12-seater executive dining table.",
    before: "/images/project-before-2.jpg",
    after: "/images/project-after-2.jpg",
    category: "Dining"
  },
  {
    id: 3,
    title: "Timber Beams to Heritage Ceiling",
    description: "Structural Anjili beams processed and installed for a traditional Kerala tharavadu restoration.",
    before: "/images/timber-stack.jpg",
    after: "/images/project-after-3.jpg",
    category: "Architecture"
  }
];

export default function ProjectTransformation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % transformations.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);

  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h3 className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary"></span>
              The Art of Conversion
            </h3>
            <h2 className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tighter uppercase leading-[0.9]">
              RAW LOG TO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">REFINED ART</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={prev}
              className="w-16 h-16 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="w-16 h-16 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative h-[600px] md:h-[750px] w-full group">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-12 h-full"
            >
              <div className="lg:col-span-8 relative rounded-[40px] overflow-hidden bg-neutral-100 border border-neutral-100 h-full shadow-2xl">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full relative overflow-hidden border-r border-white/20">
                    <Image 
                      src={transformations[currentIndex].before} 
                      alt="Before" 
                      fill
                      className="object-cover opacity-100 scale-[200%] origin-left"
                    />
                    <div className="absolute top-10 left-10 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-neutral-200">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Raw Log</span>
                    </div>
                  </div>
                  <div className="w-1/2 h-full relative overflow-hidden">
                    <Image 
                      src={transformations[currentIndex].after} 
                      alt="After" 
                      fill
                      className="object-cover scale-[200%] origin-right"
                    />
                    <div className="absolute top-10 right-10 bg-primary/10 backdrop-blur-md px-8 py-3 rounded-full border border-primary/20">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Finished Art</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/30 z-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border border-neutral-100">
                    <RefreshCcw className="text-primary animate-spin-slow" size={24} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center space-y-12">
                <div>
                  <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
                    {transformations[currentIndex].category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 leading-tight tracking-tight uppercase">
                    {transformations[currentIndex].title}
                  </h3>
                  <p className="text-neutral-500 text-lg font-light leading-relaxed">
                    {transformations[currentIndex].description}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-neutral-100 text-primary shadow-sm">
                      <PlayCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-neutral-900 font-bold text-sm uppercase tracking-widest mb-1">Process Video</h4>
                      <p className="text-xs text-neutral-400">See the craftsman in action</p>
                    </div>
                  </div>
                  
                  <button className="w-full py-6 bg-neutral-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] hover:bg-primary transition-all duration-500 shadow-xl shadow-neutral-900/10">
                    Explore Details
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
