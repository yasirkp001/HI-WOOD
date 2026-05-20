"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqData = [
  {
    category: "Materials & Quality",
    questions: [
      {
        id: 1,
        q: "What types of wood can I choose for my project?",
        a: "We primarily work with high-grade hardwoods that are best suited for Kerala's climate. Our selection includes premium Nilambur Teak, hand-picked Rosewood (Eetti), Mahogany, and Jackwood. If you have a specific species in mind, our timber scouts can source it for you from our certified networks."
      },
      {
        id: 2,
        q: "How do you ensure the wood doesn't warp or crack over time?",
        a: "The secret lies in our seasoning process. Unlike local workshops that use air-dried wood, every log at HI WOOD undergoes advanced kiln-drying in our specialized facility. We bring the moisture content down to a precise 10-12%, which makes the wood stable and resistant to the humidity changes common in our region."
      },
      {
        id: 3,
        q: "Do you use chemically treated wood?",
        a: "We believe in the natural strength of seasoned timber. Our kiln-drying process naturally eliminates pests and larvae. For specific outdoor applications, we use organic, non-toxic treatments to preserve the wood's integrity without compromising the health of your home environment."
      }
    ]
  },
  {
    category: "Design & Customization",
    questions: [
      {
        id: 4,
        q: "I have a specific design from Pinterest. Can you replicate it?",
        a: "Absolutely. Most of our clients come to us with reference photos or sketches. Our designers will work with you to adapt that vision to the specific wood species you choose, ensuring that the structural integrity is maintained while perfectly capturing the aesthetic you want."
      },
      {
        id: 5,
        q: "Can I visit the workshop to see my furniture being built?",
        a: "We encourage it! We maintain full transparency in our process. You can visit our Palazhi experience center to see the raw timber being selected and then watch our master craftsmen at work. Seeing the transformation from log to finished piece is part of the HI WOOD experience."
      },
      {
        id: 6,
        q: "How long will it take to deliver my custom order?",
        a: "Quality can't be rushed. For a standard custom piece, we typically take 4 to 6 weeks. This allows for proper final seasoning, precise joinery, and the multiple stages of hand-polishing required for a premium finish. Complex, full-house projects may take 8-10 weeks."
      }
    ]
  },
  {
    category: "Delivery & Support",
    questions: [
      {
        id: 7,
        q: "Do you deliver outside of Calicut?",
        a: "Yes, we provide safe delivery and installation across Kerala and neighboring states. We use our own fleet of Bharat Benz trucks for bulk timber and specialized furniture carriers for finished pieces to ensure they reach you in pristine condition."
      },
      {
        id: 8,
        q: "What kind of warranty do you provide?",
        a: "Every piece of HI WOOD furniture comes with a 10-year structural warranty. Because we control the process from the sawmill to the final polish, we are confident in the longevity of our work. We also provide life-long maintenance support should you ever need polishing or minor repairs."
      }
    ]
  }
];

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) =>
  return (
    <div className="border-b border-black/5 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between gap-6 text-left group"
      >
        <h3 className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-primary' : 'text-neutral-900 group-hover:text-primary'}`}>
          {question}
        </h3>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary border-primary rotate-0' : 'bg-black/5 rotate-90'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12 text-neutral-500 leading-relaxed font-light text-base md:text-lg">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1);
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918086687342";

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-primary/30 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(0,166,81,0.05)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neutral-50 border border-black/5 mb-8">
              <HelpCircle className="text-primary" size={14} />
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-neutral-500">Knowledge Base</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-8 uppercase">
              FREQUENTLY ASKED <br /> 
              <span className="text-primary">QUESTIONS</span>
            </h1>
            <p className="text-lg text-neutral-500 font-light max-w-xl mx-auto leading-relaxed">
              Find answers to common queries about our premium wood services, custom furniture process, and logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="pb-32">
        <div className="container mx-auto px-8 max-w-5xl">
          <div className="space-y-24">
            {faqData.map((section, sectionIdx) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIdx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                <div className="lg:col-span-4">
                  <div className="sticky top-40">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">{section.category}</h2>
                    <div className="w-12 h-[1px] bg-black/10"></div>
                  </div>
                </div>
                <div className="lg:col-span-8 bg-neutral-50 rounded-[2.5rem] p-8 md:p-12 border border-black/5 shadow-2xl">
                  {section.questions.map((item) => (
                    <FAQItem 
                      key={item.id}
                      question={item.q}
                      answer={item.a}
                      isOpen={openId === item.id}
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-neutral-50 border-y border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/wood-texture-pattern.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">STILL HAVE QUESTIONS?</h2>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Our team of wood experts is ready to help you with your specific requirements or any technical queries you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href={`https://wa.me/${phoneNumber}?text=Hi! I have some questions about your services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-10 py-5 bg-neutral-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-2xl"
            >
              Chat on WhatsApp <MessageSquare size={18} />
            </a>
            <Link 
              href="/contact" 
              className="group flex items-center gap-4 px-10 py-5 bg-neutral-100 border border-black/5 text-neutral-900 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all duration-500"
            >
              Contact Support <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
