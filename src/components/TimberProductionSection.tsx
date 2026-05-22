"use client";

import React, { useState } from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import OrderModal, { OrderServiceType } from './OrderModal';

const TimberProductionSection = () => {
  const [activeOrder, setActiveOrder] = useState<OrderServiceType | null>(null);

  const cards = [
    {
      id: 1,
      title: "TRANSPORTATION",
      image: "/assets/transport.jpg",
      link: "/service/transportation",
      orderType: "transportation" as OrderServiceType,
    },
    {
      id: 2,
      title: "MILLS",
      image: "/images/timber-sawmill.png",
      link: "/service/mills",
      orderType: "mills" as OrderServiceType,
    },
    {
      id: 3,
      title: "CUSTOM FURNITURE",
      image: "/assets/custom_furniture.png",
      link: "/custom-furniture",
      orderType: "custom-furniture" as OrderServiceType,
    }
  ];

  return (
    <>
      <section className="w-full bg-white py-24 px-4 md:px-8 relative">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">

          {/* Header Text */}
          <div className="text-center mb-16">
            <h3 className="text-primary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-6">
              THE POSSIBILITY OF WOOD FORESTRY
            </h3>
            <h2 className="text-neutral-900 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight uppercase max-w-4xl mx-auto [font-family:Montserrat,Manrope,sans-serif]">
              RESPONSIBLE TIMBER <br /> PRODUCTION
            </h2>
          </div>

          {/* Cards Container */}
          <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[700px] gap-4 lg:gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative rounded-3xl overflow-hidden h-[300px] lg:h-full transition-all duration-700 ease-in-out flex-[1] lg:hover:flex-[4] group"
              >
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/55" />

                {/* Text + Buttons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider uppercase transition-all duration-700 ease-in-out whitespace-nowrap drop-shadow-lg text-center
                    lg:-rotate-90 lg:group-hover:rotate-0">
                    {card.title}
                  </h4>

                  {/* Action Buttons — appear on hover */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">

                    {/* Order Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveOrder(card.orderType);
                      }}
                      className="flex items-center gap-2 bg-primary hover:brightness-110 text-white px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/30"
                    >
                      <ShoppingCart size={13} />
                      Order Now
                    </button>

                    {/* Explore Link */}
                    <Link
                      href={card.link}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all backdrop-blur-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Mobile arrow (always visible) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <ArrowRight size={18} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      <OrderModal
        isOpen={activeOrder !== null}
        onClose={() => setActiveOrder(null)}
        serviceType={activeOrder ?? "mills"}
      />
    </>
  );
};

export default TimberProductionSection;
