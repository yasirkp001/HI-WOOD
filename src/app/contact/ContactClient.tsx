"use client";

import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Send, User } from 'lucide-react';
import Link from 'next/link';
import { validatePhoneNumber } from '@/utils/phoneValidation';
import InternationalPhoneInput from '@/components/InternationalPhoneInput';
import { getUserDataFromCookies, saveUserDataToCookies } from '@/utils/cookieUtils';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');

  // Prefill contact details from cookies if accepted
  useEffect(() => {
    const data = getUserDataFromCookies();
    setFormData(prev => ({
      ...prev,
      name: data.name || prev.name,
      email: data.email || prev.email,
      phone: data.phone || prev.phone
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'phone') {
      value = value.replace(/[^0-9\s+\-()]/g, '');
      const validation = validatePhoneNumber(value);
      if (value) {
        setPhoneError(validation.error || '');
      } else {
        setPhoneError('');
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, subject, message } = formData;

    // Advanced Name Validation
    if (name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(name)) {
      alert("Name must contain only alphabetic characters, spaces or periods.");
      return;
    }

    // Advanced Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const validation = validatePhoneNumber(phone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Please enter a valid phone number.');
      return;
    }

    // Save details to cookies if consent allowed
    saveUserDataToCookies(name, phone, email);

    // Dispatch background server-side secure email notification
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone: validation.cleanedNumber,
        email,
        subject,
        message,
      }),
    })
    .then((res) => {
      if (!res.ok) console.error('Background email dispatch failed');
      else console.log('Background email dispatch succeeded');
    })
    .catch((err) => console.error('Error during background email dispatch:', err));

    const whatsappMessage = `🌲 *HI WOOD - NEW CONTACT* 🌲%0A` +
                            `━━━━━━━━━━━━━━━━━━━━%0A` +
                            `👋 *Hello HI WOOD Team,*%0A%0A` +
                            `I have a new inquiry from the contact page:%0A%0A` +
                            `👤 *Name:* ${name}%0A` +
                            `📞 *Phone:* ${validation.cleanedNumber}%0A` +
                            `✉️ *Email:* ${email}%0A` +
                            `📂 *Subject:* ${subject}%0A` +
                            `💬 *Message:* ${message}%0A%0A` +
                            `━━━━━━━━━━━━━━━━━━━━%0A` +
                            `🌐 _Sent via hiwood.com_`;
                            
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918086687342'}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-105"
          style={{ backgroundImage: `url('/assets/custom_furniture.png')` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 tracking-tighter uppercase text-white [font-family:Montserrat,sans-serif]">
            CONTACTS
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-300 uppercase tracking-widest text-xs font-bold">
            <Link href="/" className="hover:text-sand transition-colors">HOME</Link>
            <span className="w-1 h-1 bg-sand rounded-full"></span>
            <span className="text-white">CONTACTS</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 container mx-auto px-5 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">
          
          {/* Left Side: Contact Info */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <p className="text-sand font-bold text-xs tracking-[0.3em] uppercase mb-4">Contact Form</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight mb-8 [font-family:Montserrat,sans-serif]">
                HAVE A QUESTIONS? <br /> CONTACT US NOW
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-md">
                Our team is ready to help you with your timber requirements. Whether you need custom log milling or bulk supply, we are just a message away.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sand group-hover:bg-sand group-hover:text-black transition-all duration-300">
                  <Phone size={20} />
                </div>
                <span className="text-lg font-bold tracking-tight">+91 99953 70199</span>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sand group-hover:bg-sand group-hover:text-black transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <span className="text-lg font-bold tracking-tight">Palazhi, Kozhikode, Kerala, India</span>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sand group-hover:bg-sand group-hover:text-black transition-all duration-300">
                  <Mail size={20} />
                </div>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase break-all">support@hiwood.com</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#F9F8F3] rounded-[32px] md:rounded-[40px] p-5 sm:p-8 md:p-12 shadow-sm">
              <form onSubmit={handleSubmit} className="light-form space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-all placeholder:text-neutral-400"
                    />
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <InternationalPhoneInput 
                    value={formData.phone}
                    onChange={(fullNumber) => setFormData({ ...formData, phone: fullNumber })}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                    inputStyleClass="pl-2 focus:border-none focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-all placeholder:text-neutral-400"
                    />
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-all placeholder:text-neutral-400"
                    />
                    <Send size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="relative pt-4">
                  <p className="text-gray-400 text-sm mb-2">Message</p>
                  <textarea 
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-all placeholder:text-neutral-400 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-accent hover:bg-red-700 text-white font-bold tracking-widest uppercase py-5 rounded-2xl transition-all duration-300 shadow-xl mt-4"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.1766844790545!2d75.8507352!3d11.248409599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65bdcfe024db3%3A0x2cd0887ca4e627a1!2sHi%20WOOD!5e1!3m2!1sen!2sin!4v1777808143065!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
