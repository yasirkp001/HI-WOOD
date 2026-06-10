import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const furnitureItems = [
  {
    id: 1,
    name: "Classic Teak Dining Set",
    description: "Premium handcrafted teak wood dining table with 6 matching chairs.",
    image: "/images/furniture-1.jpg",
    rating: 5,
    category: "Dining"
  },
  {
    id: 3,
    name: "Minimalist Platform Bed",
    description: "Low-profile solid wood bed frame with integrated bedside ledges.",
    image: "/images/furniture-3.jpg",
    rating: 5,
    category: "Bedroom"
  },
  {
    id: 4,
    name: "Lattice Back Accent Chair",
    description: "Elegant occasional chair featuring intricate woodwork on the backrest.",
    image: "/images/furniture-4.jpg",
    rating: 5,
    category: "Seating"
  },
  {
    id: 5,
    name: "Modern Executive Desk",
    description: "Spacious mahogany workspace with clean lines and hidden cable management.",
    image: "/images/furniture-5.jpg",
    rating: 5,
    category: "Office"
  },
  {
    id: 6,
    name: "Scandinavian Sideboard",
    description: "Minimalist oak storage solution with smooth sliding doors.",
    image: "/images/furniture-6.jpg",
    rating: 5,
    category: "Living"
  },
  {
    id: 8,
    name: "Oak Finish Dressing Table",
    description: "Modern vanity with a large mirror and multiple storage compartments.",
    image: "/images/dressing-table.jpg",
    rating: 4,
    category: "Bedroom"
  }
];

const PopularFurniture = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918086687342";

  return (
    <section className="py-32 bg-neutral-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">Signature Designs</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase leading-none"
            >
              POPULAR <br /> <span className="text-neutral-400">COLLECTIONS</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-neutral-500 text-sm max-w-xs leading-relaxed"
          >
            Explore our most-loved custom pieces. Each item is handcrafted to order and can be personalized to your exact needs.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {furnitureItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white border border-black/5 group-hover:border-primary/30 transition-[border-color] duration-500">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={65}
                  className="object-cover opacity-100 group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/90 border border-black/10 text-[9px] font-black uppercase tracking-widest text-neutral-600">
                  {item.category}
                </div>

                {/* Content Overlay — fully visible on touch devices, hover-revealed on desktop */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={10} 
                            fill={i < item.rating ? "currentColor" : "none"} 
                            className={i < item.rating ? "text-primary" : "text-white/20"}
                          />
                        ))}
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-white/80 font-medium leading-relaxed max-w-[200px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-white/10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <button 
                      onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-1 py-3 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                      Customize
                    </button>
                    <a 
                      href={`https://wa.me/${phoneNumber}?text=Hi! I'm interested in the ${item.name}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white transition-colors"
                    >
                      <MessageSquare size={16} />
                    </a>
                  </div>
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All / CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <Link href="/catalog" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-primary transition-colors">
            Explore Full Catalog <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularFurniture;

