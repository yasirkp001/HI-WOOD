"use client";

import React from 'react';
import Link from 'next/link';

import { Home, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Decorative Wood Texture/Pattern (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="woodGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.4" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
          <rect width="100%" height="100%" filter="url(#woodGrain)" fill="white" />
        </svg>
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="mb-12 relative inline-block">
          <h1 className="text-[7rem] sm:text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-neutral-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="h-px w-24 bg-primary/50 absolute -left-12 hidden md:block"></div>
             <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest text-neutral-900">
                PAGE <br /> <span className="text-primary">NOT FOUND</span>
             </h2>
             <div className="h-px w-24 bg-primary/50 absolute -right-12 hidden md:block"></div>
          </div>
        </div>

        <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto">
          The page you are looking for has been moved, removed, or never existed in our forest. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/" 
            className="group flex items-center gap-4 px-10 py-5 bg-neutral-900 text-white rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
          >
            <Home size={16} />
            Return Home
          </Link>
          
          <Link 
            href="/contact" 
            className="flex items-center gap-4 px-10 py-5 border border-black/10 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-black/5 transition-all duration-500"
          >
            <MessageSquare size={16} className="text-primary" />
            Contact Support
          </Link>
        </div>

        {/* Brand Watermark */}
        <div className="mt-24 opacity-10">
          <div className="text-[10px] font-black tracking-[0.5em] uppercase">
            HI WOOD • Master Crafters
          </div>
        </div>
      </div>
    </div>
  );
}
