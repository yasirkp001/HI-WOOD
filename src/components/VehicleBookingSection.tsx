"use client";

import React, { useState } from 'react';
import { Truck, Calendar, ArrowRight, Gauge, Layers, Maximize, CheckCircle2, Shield, MapPin, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const vehicles = [
  {
    id: 1,
    name: "BHARATBENZ 3523R TIMBER CARRIER",
    type: "HEAVY DUTY LOG TRANSPORT",
    category: "35-Ton Multi-Axle Truck",
    capacity: "35 Tons GVW",
    price: "Custom Quote",
    specs: {
      load: "26,300 KG Payload",
      length: "Up to 12m (40ft) Logs",
      engine: "OM926 6-Cyl 242 HP",
      availability: "Immediate"
    },
    features: ["GPS Live Fleet Tracking", "Heavy-Duty Log Bolsters", "10-Point Tension Straps"],
    image: "/assets/hiwood_bharatbenz_mud.jpg",
    imagePosition: "object-bottom",
    description: "Primary multi-axle heavy carrier engineered for massive logs and heavy timber beams, ensuring safe, stable, and highly-secured transit across both forest tracks and highways.",
    showWheels: true
  },
  {
    id: 2,
    name: "XCMG XE150D CRAWLER LOG LOADER",
    type: "HEAVY MACHINERY RENTAL",
    category: "15-Ton Excavator",
    capacity: "15 Tons Weight",
    price: "Custom Quote",  
    specs: {
      load: "Hydraulic Log Grab",
      width: "8.5m Max Reach",
      engine: "Cummins 4BTAA 116 HP",
      availability: "Immediate"
    },
    features: ["360° Rotating Grapple", "Heavy-Duty Crawler Tracks", "High-Precision Control"],
    image: "/assets/xcmg_excavator.jpg",
    description: "High-performance crawler excavator equipped with a 360-degree rotating hydraulic wood grapple. Specially engineered for logging operations, sawmill log yards, and rough-terrain timber loading.",
    hideTires: true
  },
  {
    id: 3,
    name: "ACE 14XW MOBILE CRANE",
    type: "HYDRAULIC MOBILE CRANE RENTAL",
    category: "14-Ton Pick & Carry",
    capacity: "14 Tons Lift",
    price: "Custom Quote",
    specs: {
      load: "14,000 KG Max Lift",
      length: "15.1m Hook Height",
      engine: "Simpson S433 48 HP",
      availability: "Immediate"
    },
    features: ["4-Section Hydraulic Boom", "55° Articulated Steering", "Heavy-Duty Outriggers"],
    image: "/assets/ace_crane.jpg",
    imagePosition: "object-bottom",
    description: "High-performance articulated hydraulic pick-and-carry crane (Hydra) engineered for lifting heavy timber slabbing, sawmill operations, and safe yard material handling."
  }
];

const VehicleBookingSection = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    tons: '',
    wheels: '',
    destination: ''
  });

  const handleBookNow = (vehicle: typeof vehicles[0]) => {
    setSelectedVehicle(vehicle);
  };

  const confirmBooking = () => {
    if (!selectedVehicle) return;

    // Advanced Validation
    const tonsVal = Number(bookingDetails.tons);
    if (!bookingDetails.tons || isNaN(tonsVal) || tonsVal <= 0) {
      alert("Please enter a valid positive number of tons.");
      return;
    }

    if (selectedVehicle.showWheels && !bookingDetails.wheels) {
      alert("Please select the number of wheels required for transportation.");
      return;
    }

    if (!bookingDetails.destination || bookingDetails.destination.trim() === "") {
      alert("Please specify the destination location.");
      return;
    }

    const message = `🌲 *HI WOOD - PREMIUM VEHICLE BOOKING* 🌲%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `👋 *Hello HI WOOD Logistics,*%0A%0A` +
      `I am interested in booking the following vehicle:%0A%0A` +
      `🚛 *VEHICLE:* ${selectedVehicle.name}%0A` +
      `📦 *TYPE:* ${selectedVehicle.type}%0A` +
      `⚖️ *BASE CAPACITY:* ${selectedVehicle.capacity}%0A%0A` +
      `*MY REQUIREMENTS:*%0A` +
      `🔹 *Required Tons:* ${bookingDetails.tons}%0A` +
      (selectedVehicle.showWheels 
        ? `🔹 *Wheels Required:* ${bookingDetails.wheels}%0A` 
        : '') +
      `🔹 *Destination:* ${bookingDetails.destination.trim()}%0A%0A` +
      `Please confirm availability for my project.%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `🌐 _Sent via hiwood.com_`;

    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918086687342'}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setSelectedVehicle(null);
    setBookingDetails({ tons: '', wheels: '', destination: '' });
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none">
        <Image
          src="/assets/hiwood_bharatbenz.jpg"
          alt="background"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.03] grayscale pointer-events-none"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h3 className="text-primary font-bold text-sm tracking-[0.3em] uppercase mb-4">LOGISTICS & TRANSPORT</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 leading-none uppercase [font-family:Montserrat,sans-serif] mb-6">
            OUR PREMIUM <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">HEAVY VEHICLE</span>
          </h2>
          <p className="text-neutral-500 text-lg font-light leading-relaxed mx-auto max-w-xl">
            Professional timber transportation with a heavy vehicle specialized for every stage of the industry.
          </p>
        </div>

        <motion.div layout className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
          <AnimatePresence>
            {vehicles.map((vehicle) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={vehicle.id}
                className="group bg-white rounded-[32px] overflow-hidden border border-black/5 hover:border-primary/30 transition-all duration-500 flex flex-col lg:flex-row shadow-xl w-full"
              >
                {/* Image Side */}
                <div className="lg:w-2/5 relative overflow-hidden h-[450px] sm:h-[550px] lg:h-auto">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-110 ${vehicle.imagePosition || 'object-center'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r"></div>

                  {/* Price Tag */}
                  <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white font-bold text-xs px-4 py-2 rounded-lg">
                      {vehicle.price}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-primary text-black font-bold text-[10px] px-4 py-2 rounded-full uppercase tracking-tighter w-fit">
                      <CheckCircle2 size={12} />
                      {vehicle.specs.availability}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-3/5 p-6 lg:p-10 flex flex-col">
                  <div className="mb-6">
                    <span className="text-primary text-[11px] font-bold uppercase tracking-widest mb-3 block">{vehicle.type}</span>
                    <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">{vehicle.name}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed font-light">
                      {vehicle.description}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {vehicle.features.map(feat => (
                      <span key={feat} className="flex items-center gap-1.5 text-[10px] text-neutral-600 bg-neutral-100 border border-black/5 px-3 py-1.5 rounded-md uppercase font-semibold tracking-wider">
                        <Shield size={10} className="text-primary" />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8 border-y border-black/5 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                        <Layers size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Max Load</p>
                        <p className="text-neutral-900 font-bold">{vehicle.specs.load}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                        <Maximize size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                          {vehicle.id === 1 ? "Max Length" : vehicle.id === 2 ? "Max Reach" : "Hook Height"}
                        </p>
                        <p className="text-neutral-900 font-bold">
                          {(vehicle.specs as { length?: string; width?: string }).length || (vehicle.specs as { length?: string; width?: string }).width}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                        <Gauge size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Engine</p>
                        <p className="text-neutral-900 font-bold">{vehicle.specs.engine}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                        {vehicle.hideTires ? <Settings size={18} className="text-primary" /> : <Truck size={18} className="text-primary" />}
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Category</p>
                        <p className="text-neutral-900 font-bold">{vehicle.capacity}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(vehicle)}
                    className="w-full bg-primary hover:bg-accent text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group/btn uppercase text-[10px] tracking-widest mt-auto shadow-lg shadow-primary/20"
                  >
                    <Calendar size={18} />
                    <span>BOOK THIS VEHICLE</span>
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Security & Trust Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 shadow-xl shadow-black/5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Shield className="text-primary" size={24} />
            </div>
            <h4 className="text-neutral-900 font-bold text-sm mb-3 uppercase tracking-widest">100% Insured</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">Full transit insurance for high-value timber cargo against all transit damages.</p>
          </div>
          <div className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 shadow-xl shadow-black/5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <MapPin className="text-primary" size={24} />
            </div>
            <h4 className="text-neutral-900 font-bold text-sm mb-3 uppercase tracking-widest">Live GPS Tracking</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">Real-time location monitoring and route optimization for all heavy fleet vehicles.</p>
          </div>
          <div className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 shadow-xl shadow-black/5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <CheckCircle2 className="text-primary" size={24} />
            </div>
            <h4 className="text-neutral-900 font-bold text-sm mb-3 uppercase tracking-widest">Verified Drivers</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">Strictly background-checked, drug-tested, and certified heavy duty operators.</p>
          </div>
          <div className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 shadow-xl shadow-black/5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Layers className="text-primary" size={24} />
            </div>
            <h4 className="text-neutral-900 font-bold text-sm mb-3 uppercase tracking-widest">Secure Fastening</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">Industrial-grade multi-point load securing protocols for maximum safety.</p>
          </div>
        </div>

        {/* Contact Note */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-neutral-50 border border-black/5 rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-neutral-900 text-xl font-bold mb-2">Need a custom transportation plan?</h4>
              <p className="text-neutral-500 text-sm">We provide tailored logistics solutions for large-scale timber projects and long-term contracts.</p>
            </div>
            <button
              onClick={() => {
                const message = `🌲 *HI WOOD - CUSTOM LOGISTICS PLAN* 🌲%0A` +
                  `━━━━━━━━━━━━━━━━━━━━%0A` +
                  `👋 *Hello,*%0A%0A` +
                  `I have a specific transportation requirement that needs a custom plan.%0A%0A` +
                  `Please get in touch with me to discuss the details.%0A` +
                  `━━━━━━━━━━━━━━━━━━━━%0A` +
                  `🌐 _Sent via hiwood.com_`;
                window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918086687342'}?text=${message}`, '_blank');
              }}
              className="bg-primary hover:bg-accent text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shrink-0 whitespace-nowrap shadow-lg shadow-primary/20"
            >
              Contact Logistics Team
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white border border-black/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <h3 className="text-2xl font-bold text-neutral-900 mb-2 uppercase tracking-wide">Booking Details</h3>
              <p className="text-neutral-500 text-sm mb-8">For {selectedVehicle.name}</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Required Capacity (Tons)</label>
                  <input
                    type="number"
                    placeholder="e.g. 10"
                    value={bookingDetails.tons}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, tons: e.target.value })}
                    className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
                {selectedVehicle.showWheels && (
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Number of Wheels</label>
                    <select
                      value={bookingDetails.wheels}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, wheels: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-white">Select wheels</option>
                      <option value="4" className="bg-white">4 Wheels</option>
                      <option value="6" className="bg-white">6 Wheels</option>
                      <option value="10" className="bg-white">10 Wheels</option>
                      <option value="12" className="bg-white">12 Wheels</option>
                      <option value="14+" className="bg-white">14+ Wheels</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Destination Location</label>
                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={bookingDetails.destination}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, destination: e.target.value })}
                    className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <button
                  onClick={confirmBooking}
                  className="w-full bg-primary hover:bg-white text-black font-bold py-4 rounded-xl transition-all duration-300 mt-8 uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:shadow-white/20"
                >
                  Confirm & Send Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VehicleBookingSection;
