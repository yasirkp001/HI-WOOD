"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
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
          sizes="100vw"
          className="object-cover transition-all duration-[2s] ease-out group-hover:scale-105"
        />

        {/* Elegant Overlays */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        {/* Interactive Content */}
        <div className="relative z-10 flex flex-col items-center transition-all duration-700 ease-out">
          
          {/* Eyebrow Text */}
          <div className="mb-6">
            <p className="text-primary font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-80 group-hover:opacity-100 transition-all duration-700">
              Exclusive Factory Tour
            </p>
          </div>

          {/* Advanced Play Button */}
          <div className="relative mb-10 md:mb-12">
            {/* Outer animated ring */}
            <div className="absolute -inset-4 rounded-full border border-white/20 animate-[spin_4s_linear_infinite] group-hover:border-primary/50 transition-colors duration-500 hidden md:block"></div>
            {/* Pulsing glow */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse group-hover:bg-primary/40 transition-colors duration-500"></div>
            
            {/* Main Button */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:border-primary/60 group-hover:bg-white/20 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(34,197,94,0.3)]">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-inner group-hover:scale-95 transition-transform duration-500">
                <Play fill="black" size={28} className="text-black ml-1.5" />
              </div>
            </div>
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
