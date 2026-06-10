"use client";

import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { validatePhoneNumber } from '../utils/phoneValidation';
import InternationalPhoneInput from './InternationalPhoneInput';
import { getUserDataFromCookies, saveUserDataToCookies } from '../utils/cookieUtils';

const AppointmentSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: ''
  });
  const [phoneError, setPhoneError] = useState('');

  // Prefill user details from cookies if accepted
  useEffect(() => {
    const data = getUserDataFromCookies();
    if (data.name) {
      const parts = data.name.trim().split(/\s+/);
      const first = parts[0] || '';
      const last = parts.slice(1).join(' ') || '';
      setFormData(prev => ({
        ...prev,
        firstName: first,
        lastName: last,
        email: data.email || prev.email,
        phone: data.phone || prev.phone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        email: data.email || prev.email,
        phone: data.phone || prev.phone
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'phone') {
      // Prevent letters and invalid characters immediately
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
    const { firstName, lastName, email, phone, service } = formData;
    
    // Advanced Name Validation
    if (firstName.trim().length < 2 || lastName.trim().length < 1) {
      alert("Please enter a valid first and last name.");
      return;
    }
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      alert("Names must only contain alphabetic characters, spaces or periods.");
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

    // Save to cookies if consent allowed
    saveUserDataToCookies(`${firstName} ${lastName}`, phone, email);
    
    const message = `🌲 *HI WOOD - NEW APPOINTMENT* 🌲%0A` +
                    `━━━━━━━━━━━━━━━━━━━━%0A` +
                    `👋 *Hello HI WOOD Team,*%0A%0A` +
                    `I would like to request an appointment/service. Here are my details:%0A%0A` +
                    `👤 *Name:* ${firstName} ${lastName}%0A` +
                    `📞 *Phone:* ${validation.cleanedNumber}%0A` +
                    `✉️ *Email:* ${email}%0A` +
                    `🛠️ *Service:* ${service}%0A%0A` +
                    `Looking forward to hearing from you!%0A` +
                    `━━━━━━━━━━━━━━━━━━━━%0A` +
                    `🌐 _Sent via hiwood.com_`;
                    
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918086687342'}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 sm:px-6 md:px-12 flex items-center justify-center min-h-screen overflow-hidden"
    >
      <Image
        src="/images/appointment-bg.jpg"
        alt="Dark forest background for appointment section"
        fill
        sizes="(max-width: 1024px) 100vw, 80vw"
        quality={60}
        className="object-cover"
        priority={false}
      />
      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 border border-black/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-16 shadow-2xl" style={{ colorScheme: 'light' }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 tracking-tight uppercase [font-family:Montserrat,sans-serif]">
          MAKE AN <span className="text-accent">APPOINTMENT</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col justify-end">
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 ml-1">First Name</label>
              <input 
                type="text" 
                name="firstName"
                placeholder="First name" 
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400"
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 ml-1">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                placeholder="Last name" 
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400"
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400"
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 ml-1">Phone Number</label>
              <InternationalPhoneInput 
                value={formData.phone}
                onChange={(fullNumber) => setFormData({ ...formData, phone: fullNumber })}
                phoneError={phoneError}
                setPhoneError={setPhoneError}
                inputStyleClass="pl-2 focus:border-none focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5 ml-1">Select Service</label>
            <div className="relative">
              <select 
                name="service"
                onChange={handleChange}
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-900 appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="bg-white">Select Service</option>
                <option value="Custom Log Milling" className="bg-white">Custom Log Milling</option>
                <option value="Kiln Drying" className="bg-white">Kiln Drying</option>
                <option value="Logistics & Transportation" className="bg-white">Logistics & Transportation</option>
                <option value="Timber Sales" className="bg-white">Timber Sales</option>
                <option value="Processing" className="bg-white">Processing</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 pt-6">
            <button 
              type="submit" 
              className="w-full md:w-auto bg-primary hover:bg-accent text-white text-[11px] font-bold tracking-widest uppercase px-12 py-5 rounded-full transition-all duration-300 shadow-xl"
            >
              BOOK NOW
            </button>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">WhatsApp Support:</span>
                <div className="flex items-center gap-2 mt-1">
                  <Phone size={16} className="text-accent" fill="currentColor" />
                  <span className="text-xl font-bold text-neutral-900">+91 80866 87342</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    </section>
  );
};

export default AppointmentSection;
