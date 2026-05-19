"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VideoModal from './VideoModal';

const VideoBannerSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      {/* Cinematic Framed Container */}
      <div 
        className="relative max-w-[1400px] mx-auto h-[500px] md:h-[700px] rounded-[2rem] md:rounded-[3rem] bg-black flex flex-col items-center justify-center text-white overflow-hidden cursor-pointer shadow-2xl group"
        onClick={() => setIsVideoModalOpen(true)}
      >
        <Image 
          src="/images/hero-bg-2.jpg" 
          alt="Video banner background"
          fill
          sizes="(max-width: 1024px) 100vw, 85vw"
          quality={70}
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />

        {/* Elegant Overlays */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        {/* Interactive Content */}
        <div className="relative z-10 flex flex-col items-center transition-all duration-700 ease-out">
          

          {/* Advanced Cinematic Play Button */}
          <div className="relative mb-10 md:mb-12 group/play">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl opacity-60 group-hover/play:opacity-100 transition-opacity duration-1000"></div>

            {/* Ring 3: Cinematic Outer Focus Ring (slow rotation) */}
            <motion.div 
              className="absolute -inset-10 rounded-full border border-dashed border-primary/30 pointer-events-none hidden md:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Ring 2: Expanding Pulsing Ring */}
            <motion.div 
              className="absolute -inset-6 rounded-full border border-primary/20 pointer-events-none"
              animate={{ 
                scale: [1, 1.12, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />

            {/* Ring 1: Glassmorphic Middle Ring */}
            <motion.div 
              className="absolute -inset-2 rounded-full bg-black/25 border border-white/10 backdrop-blur-xs pointer-events-none group-hover/play:scale-105 transition-transform duration-500"
            />

            {/* Inner Core Play Button with Glassmorphism */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 shadow-[0_0_40px_rgba(34,197,94,0.15)] group-hover/play:border-primary/50 group-hover/play:shadow-[0_0_60px_rgba(34,197,94,0.35)] cursor-pointer"
            >
              {/* White Inner Circle */}
              <motion.div 
                className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-white flex items-center justify-center shadow-lg group-hover/play:bg-primary transition-colors duration-500"
              >
                <Play 
                  fill="currentColor" 
                  size={24} 
                  className="text-black group-hover/play:text-white transition-colors duration-500 ml-1" 
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Main Typography */}
          <div className="text-center px-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl [font-family:Montserrat,Manrope,sans-serif] leading-[1.1]">
              FIND THE PERFECT <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 group-hover:text-white transition-colors duration-700">
                WOODWORK
              </span>
            </h2>
          </div>
        </div>

        {/* Floating Scroll/Action Hint */}
        <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
            Click to expand video
          </span>
        </div>

      </div>

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoId="Q-AHZLXImZs" 
      />
    </section>
  );
};

export default VideoBannerSection;
