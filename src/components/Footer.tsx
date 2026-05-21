"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const socialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.7-1.6H16V4.8c-.3 0-.9-.1-1.8-.1-3 0-4.7 1.8-4.7 5V11H7v3h2.5v7h4Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
      <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2c-1.8-.5-7.6-.5-7.6-.5s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.6 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
    </svg>
  ),
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-white text-neutral-900 pt-24 pb-12 px-6 md:px-12 overflow-hidden font-sans border-t border-black/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20"
        >
          
          {/* Brand & Identity */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <Link href="/" className="cursor-pointer group block">
                <Logo className="h-14" variant="full" textColor="text-neutral-900" />
              </Link>



              
              <p className="text-neutral-500 text-sm leading-relaxed max-w-md font-light">
                Crafting nature&apos;s finest resources into architectural masterpieces. We set the standard in premium timber milling and artisanal woodwork since 1998.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="YouTube">{socialIcons.youtube}</a>
              <a href="https://www.instagram.com/hiwood_palazhi/?hl=en" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary transition-colors" aria-label="Instagram">{socialIcons.instagram}</a>
            </motion.div>
          </div>

          {/* Quick Navigations */}
          <div className="lg:col-span-3 space-y-8">
            <motion.h4 variants={itemVariants} className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Navigation</motion.h4>
            <nav>
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Custom Furniture', path: '/custom-furniture' },
                  { name: 'Experience Centers', path: '/store' },
                  { name: 'Contact', path: '/contact' }
                ].map((link) => (
                  <motion.li key={link.name} variants={itemVariants}>
                    <Link href={link.path} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-300 flex items-center gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-8">
            <motion.h4 variants={itemVariants} className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Get in Touch</motion.h4>
            <motion.div variants={itemVariants} className="space-y-5">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-neutral-500 hover:text-neutral-900 transition-colors group">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-light leading-relaxed">Palazhi, Calicut, Kerala, India</span>
              </a>
              <a href="tel:+918086687342" className="flex items-center gap-4 text-neutral-500 hover:text-neutral-900 transition-colors group">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm font-light">+91 80866 87342</span>
              </a>
              <a href="mailto:hiwoodpalazhi@gmail.com" className="flex items-center gap-4 text-neutral-500 hover:text-neutral-900 transition-colors group">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm font-light uppercase">hiwoodpalazhi@gmail.com</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-medium text-center md:text-left leading-relaxed">
            © {currentYear} <span className="text-primary">HI WOOD</span> Timber Solutions. <br className="md:hidden" /> All Rights Reserved.
          </div>
        </motion.div>
      </div>

      {/* Decorative Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-bold bg-linear-to-r from-primary/10 to-accent/10 bg-clip-text text-transparent select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        HI WOOD
      </div>
    </footer>
  );
};

export default Footer;
