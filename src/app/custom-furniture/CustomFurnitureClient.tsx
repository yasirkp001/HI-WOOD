"use client";

import React from 'react';
import { 
  MessageSquare, Phone, Send, 
  Clock, ShieldCheck, Hammer, Palette, Ruler
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import dynamic from 'next/dynamic';
const PopularFurniture = dynamic(() => import('@/components/PopularFurniture'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-[40px] mb-32" />,
  ssr: false
});

export default function CustomFurnitureClient() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918086687342";

  const woodPaletteData = [
    { name: "Nilambur Teak", desc: "The 'Queen of Timbers'. Renowned for its golden hue and unmatched longevity.", color: "bg-[#8B5A2B]", pricePerSqFt: 3500 },
    { name: "Indian Rosewood", desc: "Heavy, dense, and luxuriously dark. Perfect for statement heirloom pieces.", color: "bg-[#4A2C2A]", pricePerSqFt: 4800 },
    { name: "Red Mahogany", desc: "Features a fine, straight grain with a rich reddish-brown finish that deepens over time.", color: "bg-[#6B3E2E]", pricePerSqFt: 2200 },
    { name: "Golden Jackwood", desc: "A traditional Kerala favorite. Light, durable, and naturally termite-resistant.", color: "bg-[#D2B48C]", pricePerSqFt: 1600 }
  ];

  const [selectedWood, setSelectedWood] = React.useState(woodPaletteData[0]);
  const [length, setLength] = React.useState<number>(6);
  const [width, setWidth] = React.useState<number>(3);

  const sqFt = length * width;
  const estimatedCost = sqFt * selectedWood.pricePerSqFt;

  const features = [
    { icon: Hammer, title: "Master Craftsmanship", desc: "Expert artisans with decades of experience in traditional and modern woodworking." },
    { icon: Palette, title: "Premium Materials", desc: "Selection of the finest Teak, Rosewood, and Mahogany from sustainable sources." },
    { icon: Ruler, title: "Custom Dimensions", desc: "Tailor-made to fit your space perfectly, down to the last millimeter." },
    { icon: ShieldCheck, title: "Lifetime Quality", desc: "Built to last generations with superior joinery and premium finishes." }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden selection:bg-primary/30">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center py-32 md:py-48 overflow-hidden border-b border-black/5">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/custom-hero.jpg" 
              alt="Bespoke wooden furniture with rattan panels" 
              fill 
              sizes="100vw"
              quality={70}
              className="object-cover opacity-100"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Bespoke Excellence</p>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-10 uppercase text-white"
              >
                YOUR VISION <br /> 
                <span className="text-white/80">OUR HANDS</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 font-light max-w-xl leading-relaxed mb-12"
              >
                Get your furniture exactly how you want it. Whether it&apos;s a unique dining set or a custom-size bed, we build it to your design, your wood choice, and your budget.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 bg-[#25D366] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#20ba5a] transition-all shadow-2xl rounded-full"
                >
                  Request A Quote
                </button>
                <a 
                  href={`https://wa.me/${phoneNumber}?text=Hi Hi Wood! I want to discuss a custom furniture design.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-[#25D366] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#20ba5a] transition-all flex items-center gap-3 rounded-full shadow-2xl"
                >
                  <MessageSquare size={16} className="text-white" />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 bg-neutral-50 relative">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((f, i) => (
                <motion.div 
                   key={i}
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 rounded-[32px] bg-white border border-black/5 hover:border-primary/20 hover:bg-neutral-100 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                    <f.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-medium group-hover:text-neutral-600 transition-colors">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Wood Palette Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-[1px] bg-primary"></div>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">The Foundation of Quality</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-neutral-900 tracking-tighter uppercase leading-[0.9]">
                  OUR WOOD <br /> <span className="text-neutral-400">PALETTE</span>
                </h2>
              </div>
              <p className="text-neutral-500 text-[11px] max-w-xs leading-relaxed font-medium mb-2">
                We source only the finest, sustainable hardwoods. Select a species to plan and book your bespoke timber size.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-16">
              {woodPaletteData.map((wood, i) => {
                const isSelected = selectedWood.name === wood.name;
                return (
                  <motion.div 
                    key={i}
                    onClick={() => setSelectedWood(wood)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative overflow-hidden rounded-[32px] border aspect-square cursor-pointer transition-all duration-300 ${
                      isSelected ? 'border-primary shadow-xl ring-2 ring-primary/20 scale-[1.02]' : 'border-black/5 hover:border-primary/50'
                    }`}
                  >
                    <div className={`absolute inset-0 ${wood.color} transition-transform duration-700 group-hover:scale-110 opacity-100`}>
                      {/* Texture overlay */}
                      <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Active checkmark badge */}
                    {isSelected && (
                      <div className="absolute top-6 right-6 bg-primary text-white p-2 rounded-full shadow-lg z-20 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-10">
                      <div className="text-[8px] md:text-[10px] text-white/60 font-black tracking-widest uppercase mb-1">
                        ₹{wood.pricePerSqFt.toLocaleString('en-IN')} / Sq.Ft
                      </div>
                      <h3 className="text-white text-sm md:text-lg font-bold uppercase tracking-tight mb-1 md:mb-2">{wood.name}</h3>
                      <p className="text-white/70 text-[9px] md:text-[10px] leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">{wood.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Calculator Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-50 border border-black/5 rounded-[40px] p-8 md:p-12 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-2 block">Interactive Planner</span>
                    <h3 className="text-2xl md:text-3xl font-black text-neutral-900 uppercase tracking-tight">
                      Calculate Your Timber & Size
                    </h3>
                    <p className="text-neutral-500 text-xs mt-2">
                      Adjust the length and width sliders below to define your bespoke furniture panel. See real-time size and estimated cost instantly.
                    </p>
                  </div>

                  {/* Length Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-black uppercase tracking-widest text-neutral-700">
                        Length: <span className="text-primary font-bold text-sm ml-1">{length} Feet</span>
                      </label>
                      <span className="text-[10px] text-neutral-400 font-medium">Min 1 ft - Max 20 ft</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="1" 
                        max="20" 
                        step="0.5"
                        value={length} 
                        onChange={(e) => setLength(parseFloat(e.target.value))}
                        className="w-full accent-primary h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input 
                        type="number" 
                        min="1" 
                        max="20" 
                        value={length}
                        onChange={(e) => setLength(Math.max(1, Math.min(20, parseFloat(e.target.value) || 1)))}
                        className="w-20 bg-white border border-black/5 rounded-xl px-3 py-2 text-center text-xs font-bold outline-none text-neutral-900 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  {/* Width Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-black uppercase tracking-widest text-neutral-700">
                        Width: <span className="text-primary font-bold text-sm ml-1">{width} Feet</span>
                      </label>
                      <span className="text-[10px] text-neutral-400 font-medium">Min 1 ft - Max 10 ft</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        step="0.5"
                        value={width} 
                        onChange={(e) => setWidth(parseFloat(e.target.value))}
                        className="w-full accent-primary h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={width}
                        onChange={(e) => setWidth(Math.max(1, Math.min(10, parseFloat(e.target.value) || 1)))}
                        className="w-20 bg-white border border-black/5 rounded-xl px-3 py-2 text-center text-xs font-bold outline-none text-neutral-900 focus:border-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary / Booking Card */}
                <div className="lg:col-span-5 bg-white border border-black/5 rounded-[32px] p-8 shadow-xl flex flex-col justify-between h-full min-h-[300px]">
                  <div className="space-y-6">
                    <div className="border-b border-black/5 pb-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Selected Selection</span>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`w-3.5 h-3.5 rounded-full ${selectedWood.color} border border-white shadow-sm`}></span>
                        <span className="text-md font-black text-neutral-900 uppercase tracking-tight">{selectedWood.name}</span>
                      </div>
                      
                      {/* Interactive texture preview using floor.jpg */}
                      <div className="relative h-28 rounded-2xl overflow-hidden border border-black/5 mt-4">
                        <Image 
                          src="/images/floor.jpg" 
                          alt="Finished wood panel preview" 
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          quality={65}
                          className="object-cover"
                        />
                        {/* Blend overlay to apply the selected wood color hue */}
                        <div className={`absolute inset-0 ${selectedWood.color} mix-blend-multiply opacity-80`}></div>
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-neutral-900 shadow-sm">
                          Material Preview
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500 font-medium">Dimensions</span>
                        <span className="text-neutral-900 font-bold">{length} ft × {width} ft</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500 font-medium">Total Area</span>
                        <span className="text-neutral-900 font-black">{sqFt.toFixed(1)} Sq.Ft</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-500 font-medium">Rate / Sq.Ft</span>
                        <span className="text-primary font-bold">₹{selectedWood.pricePerSqFt.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-black/5 mt-6 space-y-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Estimated Cost</span>
                      <span className="text-2xl font-black text-neutral-900">₹{estimatedCost.toLocaleString('en-IN')}</span>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        const wpMsg = `Hi HI WOOD! I would like to book a custom wood palette square feet size.\n\nSelected Wood: ${selectedWood.name}\nDimensions: ${length} ft x ${width} ft\nTotal Area: ${sqFt.toFixed(1)} Sq.Ft\nRate per Sq.Ft: ₹${selectedWood.pricePerSqFt}\nEstimated Timber Cost: ₹${estimatedCost.toLocaleString('en-IN')}\n\nPlease contact me to finalize the custom furniture placement!`;
                        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(wpMsg)}`, '_blank');
                      }}
                      className="w-full bg-primary hover:bg-primary/95 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                      <MessageSquare size={16} className="text-white" />
                      Book Wood Palette Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 relative bg-white">
          <div className="container mx-auto px-8">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">THE JOURNEY OF <br /><span className="text-primary">YOUR FURNITURE</span></h2>
              <p className="text-neutral-500 text-sm max-w-xl mx-auto">From the first sketch to the final polish, here is how we bring your vision to life.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-black/5 -translate-y-1/2 z-0"></div>
              
              {[
                { step: "01", title: "Consultation", desc: "Share your ideas, sketches, or photos. We discuss wood types and dimensions." },
                { step: "02", title: "Design & Quote", desc: "Our designers create a blueprint and provide a transparent cost estimate." },
                { step: "03", title: "Crafting", desc: "Master artisans hand-build your piece using traditional joinery techniques." },
                { step: "04", title: "Delivery", desc: "Expert finishing followed by safe delivery and installation in your space." }
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 bg-neutral-50 border border-black/5 p-10 rounded-[40px] hover:border-primary/30 transition-all group"
                >
                  <span className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors mb-6 block leading-none">{s.step}</span>
                  <h4 className="text-neutral-900 text-lg font-bold uppercase tracking-tight mb-4">{s.title}</h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legacy & Innovation Section */}
        <section className="py-32 relative overflow-hidden bg-white">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[40px] overflow-hidden border border-black/10">
                  <Image 
                    src="/images/about-forest.jpg" 
                    alt="Legacy & Innovation" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={70}
                    className="object-cover opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-[32px] hidden md:block shadow-2xl">
                  <p className="text-4xl font-black text-white leading-none">30+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mt-2">Years of <br />Mastery</p>
                </div>
              </motion.div>

              <div className="space-y-10">
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-12 h-[1px] bg-primary"></div>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">The Hi Wood Story</span>
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-neutral-900 tracking-tighter uppercase leading-[0.9] mb-8"
                  >
                    LEGACY & <br /> <span className="text-neutral-400">INNOVATION</span>
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-neutral-500 text-lg font-light leading-relaxed max-w-xl"
                  >
                    Our journey began in a small workshop with a simple passion for wood. Today, we combine traditional craftsmanship with modern precision to create furniture that tells a story. From the raw log to the final polish, every step is a testament to our commitment to excellence.
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-10 pt-10 border-t border-black/5"
                >
                  <div>
                    <h4 className="text-neutral-900 text-sm font-black uppercase tracking-widest mb-3">Traditional</h4>
                    <p className="text-neutral-500 text-[11px] leading-relaxed">Time-honored joinery techniques passed down through generations of master carpenters.</p>
                  </div>
                  <div>
                    <h4 className="text-neutral-900 text-sm font-black uppercase tracking-widest mb-3">Modern</h4>
                    <p className="text-neutral-500 text-[11px] leading-relaxed">High-precision milling and contemporary design aesthetics for the modern home.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Designs Section */}
        <PopularFurniture />

        {/* Quote Form Section */}
        <section id="quote-form" className="py-32 relative">
          <div className="container mx-auto px-8 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">START YOUR <br />PROJECT</h2>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                    Fill out the form below or send us a sketch on WhatsApp. Our design experts will get back to you within 24 hours with a custom quote.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center text-neutral-500">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Call for Consult</p>
                      <p className="text-lg font-bold">+91 80866 87342</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center text-neutral-500">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Response Time</p>
                      <p className="text-lg font-bold">Within 24 Hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 border border-black/5 rounded-[40px] p-10 md:p-12 shadow-2xl">
                <form 
                  className="space-y-6" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const phone = formData.get('phone');
                    const type = formData.get('type');
                    const message = formData.get('message');
                    const wpMsg = `Hi Hi Wood! I'm requesting a quote.\n\nName: ${name}\nPhone: ${phone}\nFurniture Type: ${type}\nRequirements: ${message}`;
                    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(wpMsg)}`, '_blank');
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Full Name</label>
                      <input name="name" type="text" required className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary/50 transition-all text-neutral-900" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Phone Number</label>
                      <input name="phone" type="tel" required className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary/50 transition-all text-neutral-900" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Furniture Type</label>
                    <select name="type" className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary/50 transition-all appearance-none text-neutral-900">
                      <option className="bg-white">Dining Table</option>
                      <option className="bg-white">Bed Frame</option>
                      <option className="bg-white">Wardrobe</option>
                      <option className="bg-white">Sofa Set</option>
                      <option className="bg-white">Other / Custom</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Message / Requirements</label>
                    <textarea name="message" required className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary/50 transition-all h-32 resize-none text-neutral-900" placeholder="Tell us what you're looking for..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                    <Send size={16} /> Submit & Chat on WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
