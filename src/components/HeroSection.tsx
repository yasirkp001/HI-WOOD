"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VideoModal from './VideoModal';

const heroBg = '/images/hero-bg-1.jpg';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const HeroSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden">
      {/* Background Image Container - Static */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroBg}
          alt="Premium timber background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-6 flex flex-col justify-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
                Premium Timber Solutions
              </p>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8 sm:mb-10 text-white uppercase">
              THE ART OF <br />
              <span className="text-primary">PRECISION</span> <br />
              TIMBER
            </motion.h1>
            
            <motion.p variants={itemVariants} className="max-w-xl text-base sm:text-lg text-white/90 font-light leading-relaxed mb-10 sm:mb-12 border-l-2 border-primary/30 pl-5 sm:pl-8">
              From advanced kiln-seasoning to bespoke artisanal furniture, we transform nature&apos;s finest logs into architectural masterpieces for generations.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8">
              <Link href="/contact" className="group flex items-center justify-center gap-4 bg-primary hover:bg-accent text-white text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 sm:px-12 sm:py-5 rounded-sm transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Request A Quote
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </main>

        <VideoModal 
          isOpen={isVideoModalOpen} 
          onClose={() => setIsVideoModalOpen(false)} 
          videoId="Q-AHZLXImZs" 
        />

        {/* Hero Footer Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="container mx-auto px-6 pb-12 flex flex-wrap items-end justify-between gap-8"
        >
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-2">Location</p>
              <p className="text-sm font-light text-white">Palazhi, Kerala</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-2">Since</p>
              <p className="text-sm font-light text-white">1998</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-24 h-[1px] bg-black/10"></div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
