"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, X, ChevronRight, Droplets, Settings, ShoppingCart } from 'lucide-react';
import VehicleBookingSection from '@/components/VehicleBookingSection';
import OrderModal from '@/components/OrderModal';
import { motion } from 'framer-motion';
import { serviceData, Vehicle, ServiceFeature, ServiceSpec, WorkflowStep } from '@/data/serviceData';

interface ServiceDetailClientProps {
  id: string;
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ServiceDetailClient({ id }: ServiceDetailClientProps) {
  const service = serviceData[id.toLowerCase()];
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);


  if (!service) return null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-primary selection:text-white pb-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {service.heroVideo ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              poster={service.heroImage}
              className="w-full h-full object-cover opacity-90"
            >
              <source src={service.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image 
              src={service.heroImage} 
              alt={service.title} 
              fill
              sizes="100vw"
              className={`w-full h-full object-cover opacity-90 ${service.heroImagePosition || 'object-center'}`}
              priority
              fetchPriority="high"
              unoptimized
            />
          )}
        </motion.div>
        
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-black/30"></div>

        <div className="relative z-20 container mx-auto px-6 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter uppercase [font-family:Montserrat,sans-serif] leading-[0.8] text-center w-full text-white">
              {service.title}
            </motion.h1>

            <motion.div variants={fadeUpVariant} className="max-w-3xl mx-auto">
              <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light px-6">
                {service.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
        

      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-32 container mx-auto px-6 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.div variants={fadeUpVariant}>
                <h3 className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-primary"></span>
                  Overview
                </h3>
                <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-[1.1] text-balance">
                  {service.subtitle}
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm md:text-lg font-light border-l-2 border-primary/30 pl-6 max-w-2xl">
                  {service.description}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {service.features.map((f: ServiceFeature, i: number) => {
                  const Icon = f.icon;
                  return (
                    <motion.div 
                      key={i} 
                      variants={fadeUpVariant}
                      className="flex flex-col gap-4 group p-6 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-primary/50 transition-colors duration-300"
                    >
                      {Icon && (
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                          <Icon className="text-primary" size={24} />
                        </div>
                      )}
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-neutral-900 group-hover:text-primary transition-colors">{f.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                    </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Image & Specs */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-[40px] overflow-hidden relative group aspect-[4/5] lg:aspect-auto lg:h-[700px] border border-neutral-200">
                <Image 
                  src={service.detailImage || service.heroImage} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${service.detailImagePosition || service.heroImagePosition || 'object-center'}`} 
                />
                <div className="absolute inset-0 bg-black/10"></div>
                
                {service.specs && (
                  <div className="absolute inset-x-6 bottom-6">
                    <div className="bg-white/95 rounded-[32px] p-8 border border-neutral-200 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h4 className="text-neutral-900 text-lg font-bold mb-6 flex items-center justify-between">
                        Specifications <ChevronRight size={18} className="text-primary" />
                      </h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        {service.specs?.map((spec: ServiceSpec, i: number) => (
                          <div key={i} className="border-l-2 border-primary/50 pl-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">{spec.label}</p>
                            <p className="text-sm font-bold text-neutral-900">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </section>

      {/* Machinery Spotlight for Mills */}
      {id === 'mills' && (
        <section className="py-32 relative bg-white overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <h3 className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-6">Advanced Technology</h3>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">PRECISION <br /> MACHINERY</h2>
                <div className="space-y-8">
                  {[
                    { title: "Vertical Band Saws", desc: "High-speed vertical cutting for large logs with minimal kerf loss." },
                    { icon: Droplets, title: "Automated Kiln Seasons", desc: "Computer-controlled drying environment for perfect moisture levels." },
                    { icon: Settings, title: "Horizontal Slabbing", desc: "Perfectly flat boards for table tops and large architectural pieces." }
                  ].map((m, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <Settings size={20} />
                      </div>
                      <div>
                        <h4 className="text-neutral-900 font-bold uppercase tracking-tight mb-2">{m.title}</h4>
                        <p className="text-neutral-500 text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="aspect-square rounded-[40px] overflow-hidden border border-black/5 relative w-full h-full min-h-[300px] md:min-h-[450px]">
                  <Image 
                    src="/assets/IMG_6664.JPG" 
                    alt="Machinery" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                {/* Statistics overlay */}
                <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-[32px] hidden md:block">
                  <p className="text-4xl font-black text-white leading-none">0.5mm</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mt-2">Cutting <br />Precision</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Workflow Section */}
      {service.workflow && (
        <section className="py-16 md:py-32 relative bg-neutral-50">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20 text-center max-w-3xl mx-auto"
            >
              <h3 className="text-accent font-bold text-xs tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-accent/50"></span>
                Our Process
                <span className="w-12 h-[1px] bg-accent/50"></span>
              </h3>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
                OUR <span className="text-primary">{service.title}</span> WORKFLOW
              </h2>
              <p className="text-neutral-500 text-lg">A meticulous journey ensuring precision and excellence in every step.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative"
            >
              {/* Connecting Line (static) */}
              <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[1px] bg-neutral-200 z-0"></div>

              {service.workflow?.map((w: WorkflowStep, i: number) => (
                <motion.div variants={fadeUpVariant} key={i} className="relative z-10 group">
                  <div className="bg-white border border-neutral-200 rounded-[32px] p-8 h-full hover:border-primary/50 transition-colors duration-300 flex flex-col items-center text-center lg:items-start lg:text-left shadow-sm">
                    <div className="w-20 h-20 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-8 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <span className="text-3xl font-black text-neutral-900">{w.step}</span>
                    </div>
                    
                    <h4 className="text-lg font-black uppercase tracking-widest text-neutral-900 mb-4 group-hover:text-primary transition-colors">{w.title}</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-light">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {id === 'transportation' && <VehicleBookingSection />}

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-[40px] bg-neutral-50 border border-neutral-200 p-10 md:p-16 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight text-neutral-900">Ready to Start Your Project?</h2>
              <p className="text-neutral-500 text-lg mb-10">Contact our experts today to discuss your timber requirements and get a customized quote for your architectural needs.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {id === 'mills' && (
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 group"
                  >
                    <ShoppingCart size={20} />
                    Place Order
                  </button>
                )}
                <Link href="/contact" className="inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors group">
                  Contact Us
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      {/* Order Modal — Mills only */}
      {id === 'mills' && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          serviceType="mills"
        />
      )}

    </div>
  );
}
