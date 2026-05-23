"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ArrowRight, Star, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const catalogItems = [
  // DINING
  {
    id: 1,
    name: "Classic Teak Dining Set",
    description: "Premium handcrafted teak wood dining table with 6 matching chairs.",
    image: "/images/furniture-1.jpg",
    rating: 5,
    category: "Dining",
    price: "Custom"
  },
  {
    id: 2,
    name: "Live Edge Mahogany Table",
    description: "Natural edge mahogany slab table with industrial steel legs.",
    image: "/images/furniture-8.jpg",
    rating: 5,
    category: "Dining",
    price: "Custom"
  },
  {
    id: 3,
    name: "Round Rosewood Breakfast Table",
    description: "Elegant circular rosewood table perfect for cozy morning meals.",
    image: "/images/furniture-3.jpg",
    rating: 4,
    category: "Dining",
    price: "Custom"
  },
  {
    id: 4,
    name: "Minimalist Ash Dining Chairs",
    description: "Set of 4 lightweight and durable ash wood chairs with ergonomic design.",
    image: "/images/furniture-4.jpg",
    rating: 5,
    category: "Dining",
    price: "Custom"
  },

  // BEDROOM
  {
    id: 5,
    name: "Minimalist Platform Bed",
    description: "Low-profile solid wood bed frame with integrated bedside ledges.",
    image: "/images/furniture-3.jpg",
    rating: 5,
    category: "Bedroom",
    price: "Custom"
  },
  {
    id: 6,
    name: "Carved Rosewood Wardrobe",
    description: "Spacious wardrobe featuring traditional hand-carved patterns.",
    image: "/images/furniture-5.jpg",
    rating: 5,
    category: "Bedroom",
    price: "Custom"
  },
  {
    id: 7,
    name: "Teak Wood Nightstands",
    description: "Pair of elegant teak nightstands with soft-close drawers.",
    image: "/images/furniture-6.jpg",
    rating: 5,
    category: "Bedroom",
    price: "Custom"
  },
  {
    id: 8,
    name: "Oak Finish Dressing Table",
    description: "Modern vanity with a large mirror and multiple storage compartments.",
    image: "/images/dressing-table.jpg",
    rating: 4,
    category: "Bedroom",
    price: "Custom"
  },

  // OFFICE
  {
    id: 9,
    name: "Modern Executive Desk",
    description: "Spacious mahogany workspace with clean lines, built-in soft-close drawers, and integrated cable management.",
    image: "/images/furniture-5.jpg",
    rating: 5,
    category: "Office",
    price: "Custom"
  },
  {
    id: 10,
    name: "Teak Wood Office Bookshelf",
    description: "Premium teak cabinet featuring modern floating open shelving combined with traditional sliding wood shutter cupboards.",
    image: "/images/furniture-4.jpg",
    rating: 5,
    category: "Office",
    price: "Custom"
  },

  // LIVING
  {
    id: 11,
    name: "Scandinavian Oak Sideboard",
    description: "Minimalist light oak credenza utilizing soft-slide solid wood doors for sophisticated living room organization.",
    image: "/images/furniture-6.jpg",
    rating: 5,
    category: "Living",
    price: "Custom"
  },
  {
    id: 12,
    name: "Live Edge Coffee Table",
    description: "Natural edge solid rosewood coffee table slab resting on custom handcrafted raw-finish steel hair-pin legs.",
    image: "/images/furniture-8.jpg",
    rating: 5,
    category: "Living",
    price: "Custom"
  },
  {
    id: 13,
    name: "Minimalist Floating TV Console",
    description: "Sturdy wall-mounted teak console with sleek wire passageways and subtle fluted wooden cabinet front panels.",
    image: "/images/furniture-3.jpg",
    rating: 4,
    category: "Living",
    price: "Custom"
  },

  // STORAGE
  {
    id: 14,
    name: "Solid Mahogany Sideboard",
    description: "Sophisticated multi-drawer mahogany credenza with custom antique-finish brass handles and generous internal shelving.",
    image: "/images/furniture-1.jpg",
    rating: 5,
    category: "Storage",
    price: "Custom"
  },
  {
    id: 15,
    name: "Minimalist Oak Credenza",
    description: "Premium European white oak cabinet offering a flawless, clean design with touch-release storage cabinets.",
    image: "/images/furniture-6.jpg",
    rating: 4,
    category: "Storage",
    price: "Custom"
  },

  // SEATING
  {
    id: 16,
    name: "Lattice Back Accent Chair",
    description: "Heritage-carved occasion armchair showcasing elegant geometric lattice work on the backrest, finished in deep rosewood.",
    image: "/images/furniture-4.jpg",
    rating: 5,
    category: "Seating",
    price: "Custom"
  },
  {
    id: 17,
    name: "Traditional Rocking Chair",
    description: "An authentic, heritage-inspired teak wood rocking chair designed with custom ergonomic contouring for deep comfort.",
    image: "/images/furniture-8.jpg",
    rating: 5,
    category: "Seating",
    price: "Custom"
  }
];

const categories = ["All", "Dining", "Bedroom", "Office", "Living", "Storage", "Seating"];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918086687342";

  const allFilteredItems = catalogItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredItems = allFilteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < allFilteredItems.length;

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-primary/30 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-black/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">The Full Collection</p>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-10 uppercase">
              EXPLORE OUR <br /> 
              <span className="text-neutral-400">CATALOG</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 font-light max-w-xl leading-relaxed">
              Every piece in our catalog is a testament to our legacy of craftsmanship. Browse our collection and customize any design to your preference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-white border-b border-black/5 py-6">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-black/5 text-neutral-500 hover:bg-black/10 hover:text-neutral-900 border border-black/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-black/10 rounded-full pl-14 pr-6 py-4 text-sm outline-none focus:border-primary/50 focus:bg-neutral-50 transition-all text-neutral-900 shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white border border-black/5 group-hover:border-primary/30 transition-[border-color] duration-500">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        priority={index < 2}
                        quality={60}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover opacity-100 group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <div className="px-4 py-1.5 rounded-full bg-white/90 border border-black/10 text-[9px] font-black uppercase tracking-widest text-neutral-600 w-fit">
                          {item.category}
                        </div>
                      </div>
 
                      {/* Content Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="mb-4">
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
                          <p className="text-[11px] text-white/80 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
 
                        <div className="flex gap-3 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          <a 
                            href={`https://wa.me/${phoneNumber}?text=Hi! I'm interested in customizing the ${item.name} from your catalog.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-4 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            <MessageSquare size={14} /> Customize
                          </a>
                        </div>
                      </div>
                      
                      {/* Subtle dark overlay for text readability */}
                      <div className="absolute inset-0 bg-black/40 opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-40 text-center">
              <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-8 border border-black/10">
                <Search size={32} className="text-gray-600" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">No Products Found</h3>
              <p className="text-neutral-500 max-w-xs mx-auto mb-10">We couldn't find any products matching your search or category choice.</p>
              <button 
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="px-8 py-4 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {hasMore && (
            <div className="mt-20 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="group inline-flex items-center gap-4 px-12 py-5 bg-neutral-900 border border-black/10 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500 shadow-xl"
              >
                Load More Products <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-neutral-50 border-y border-black/5">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">HAVE A CUSTOM DESIGN?</h2>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto mb-12">
            If you have a specific design in mind that isn't in our catalog, we can build it for you. Send us your requirements or sketches.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
            Request Custom Build <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <CatalogContent />
    </Suspense>
  );
}
