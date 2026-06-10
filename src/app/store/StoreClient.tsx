"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
interface Branch {
  city: string;
  area: string;
  phone: string;
  email: string;
  mapUrl: string;
}

const branches: Branch[] = [
  { 
    city: "Calicut", 
    area: "Palazhi (Head Office)", 
    phone: "+91 80866 87342", 
    email: "clt@hiwood.com",
    mapUrl: "https://www.google.com/maps/place/Hi+WOOD/@11.2484096,75.8507352,17z/data=!3m1!1b1!4m6!3m5!1s0x3ba65bdcfe024db3:0x2cd0887ca4e627a1!8m2!3d11.2484096!4d75.8507352!16s%2Fg%2F11f01p1y1n",
  }
];

export default function StoreClient() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-white text-neutral-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/3"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/5 border border-black/5 mb-8">
              <MapPin size={14} className="text-primary" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-500">
                Our Network
              </p>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter">
              EXPLORE OUR <br /> <span className="text-primary">LOCATIONS</span>
            </h1>
            <p className="text-neutral-500 text-lg md:text-xl font-light max-w-xl leading-relaxed">
              Visit our experience centers in Kozhikode to touch the textures, smell the fresh-cut timber, and collaborate with our designers on your next masterpiece.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Branches List */}
      <section className="py-32 bg-white text-neutral-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto w-full">
            {branches.map((branch, idx) => (
              <motion.div 
                key={branch.city}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="w-full"
              >
                {/* Branch Details */}
                <div className="w-full space-y-10 bg-white/20 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] border border-black/5 p-6 sm:p-8 md:p-12 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-4">Experience Center</h3>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tighter">{branch.city}</h2>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed">
                      Our {branch.city} branch showcases our flagship collection and provides expert consultation for all your timber needs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-black/10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-neutral-400">
                        <MapPin size={18} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Address</span>
                      </div>
                      <p className="text-sm text-neutral-800 font-medium">{branch.area}, Kerala</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-neutral-400">
                        <Phone size={18} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Contact</span>
                      </div>
                      <p className="text-sm text-neutral-800 font-medium">{branch.phone}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={branch.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all duration-300 shadow-xl">
                       View on Map <Globe size={14} />
                    </a>
                    <button 
                      onClick={() => window.open(`https://wa.me/${branch.phone.replace(/[^0-9]/g, '')}?text=Hi Hi Wood ${branch.city}! I would like to visit your branch.`, '_blank')}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-100 text-neutral-900 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all duration-300"
                    >
                      WhatsApp Us <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-neutral-900 mb-8 tracking-tighter">CAN&apos;T FIND A BRANCH NEAR YOU?</h2>
          <p className="text-neutral-500 mb-12 text-lg font-light max-w-2xl mx-auto">
            Don&apos;t worry, we provide shipping and consultation services across India. Get in touch with our head office for remote assistance.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-neutral-900 transition-all duration-500">
            Contact Head Office
          </Link>
        </div>
      </section>
    </main>
  );
}
