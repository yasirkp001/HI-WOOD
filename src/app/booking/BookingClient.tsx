"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, MessageSquare, ChevronRight, CheckCircle2 } from 'lucide-react';
import { validatePhoneNumber } from '@/utils/phoneValidation';
import InternationalPhoneInput from '@/components/InternationalPhoneInput';

function BookingForm() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get('service') || 'General Inquiry';
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validatePhoneNumber(phone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Please enter a valid phone number.');
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name');
    const email = formData.get('email');
    const details = formData.get('details');

    const message = `Hello Hi Wood! I would like to book a service.%0A%0A` +
      `*Service:* ${serviceName}%0A` +
      `*Name:* ${name}%0A` +
      `*Email:* ${email}%0A` +
      `*Phone:* ${validation.cleanedNumber}%0A` +
      `*Project Details:* ${details}`;

    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918086687342';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-20 px-6 text-center"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-primary w-12 h-12" />
        </div>
        <h2 className="text-4xl font-bold text-neutral-900 mb-4 uppercase">Booking Confirmed!</h2>
        <p className="text-neutral-500 mb-10 text-lg">Thank you for choosing Hi Wood. Our team will contact you within 24 hours to confirm your appointment for <span className="font-bold text-neutral-900">{serviceName}</span>.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-10 py-4 bg-neutral-900 text-white rounded-full hover:bg-primary transition-all duration-300 font-bold uppercase tracking-widest text-[11px]"
        >
          Return Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Info */}
        <div className="w-full lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
                Reservations
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight uppercase">
              BOOK YOUR <br /> <span className="text-primary">CONSULTATION</span>
            </h1>
            <p className="text-neutral-500 mb-12 text-lg font-light leading-relaxed">
              Schedule a precision milling session or timber consultation with our expert sawyers.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-widest mb-1">Expert Sawyers</h4>
                  <p className="text-sm text-neutral-500">16+ Years of Craftsmanship</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-widest mb-1">Flexible Slots</h4>
                  <p className="text-sm text-neutral-500">Mon - Sat: 8AM - 6PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-neutral-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                    <input 
                      required 
                      name="name"
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white transition-all text-neutral-900" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                    <input 
                      required 
                      name="email"
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white transition-all text-neutral-900" 
                    />
                  </div>
                </div>
                <div className="space-y-3 flex flex-col justify-end">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 ml-1">Phone Number</label>
                  <InternationalPhoneInput 
                    value={phone}
                    onChange={(fullNumber) => setPhone(fullNumber)}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                    inputStyleClass="pl-2 focus:border-none focus:outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 ml-1">Selected Service</label>
                  <div className="relative">
                    <ChevronRight className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                    <input 
                      readOnly 
                      value={serviceName}
                      className="w-full pl-12 pr-6 py-4 bg-neutral-100 border border-neutral-100 rounded-2xl focus:outline-none text-neutral-500 font-medium" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 ml-1">Project Details</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-6 text-neutral-300" size={18} />
                  <textarea 
                    rows={4} 
                    name="details"
                    placeholder="Tell us about your timber project dimensions and requirements..."
                    className="w-full pl-12 pr-6 py-6 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white transition-all text-neutral-900 resize-none"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-neutral-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-primary transition-all duration-500 shadow-xl shadow-neutral-900/10"
              >
                Confirm Booking Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function BookingClient() {
  return (
    <div className="pt-24 bg-white">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
