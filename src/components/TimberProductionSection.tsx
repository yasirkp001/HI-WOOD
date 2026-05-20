import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TimberProductionSection = () => {
  const cards = [
    {
      id: 1,
      title: " CUSTOM FURNITURE ",
      image: "/assets/custom_furniture.png",
      link: "/custom-furniture"
    },
    {
      id: 2,
      title: " MILLS",
      image: "/images/timber-sawmill.png",
      link: "/service/mills"
    },
    {
      id: 3,
      title: "TRANSPORTATION",
      image: "/assets/transport.jpg",
      link: "/service/transportation"
    }
  ];

  return (
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

        {/* Cards Container with Flex Accordion Effect */}
        <div className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[700px] gap-4 lg:gap-6">
          {cards.map((card) => (
            <Link 
              key={card.id} 
              href={card.link || '#'}
              className={`relative rounded-3xl overflow-hidden cursor-pointer h-full transition-all duration-700 ease-in-out flex-[1] lg:hover:flex-[4] group ${!card.title ? 'hidden md:block' : ''}`}
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
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/50"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="flex flex-col items-center">
                  <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider uppercase transition-all duration-700 ease-in-out whitespace-nowrap drop-shadow-lg text-center
                    lg:-rotate-90 lg:group-hover:rotate-0 mb-4">
                    {card.title}
                  </h4>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 bg-white/20 px-4 py-2 rounded-full border border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Explore</span>
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Mobile/Default Indicator (Always visible but subtle) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimberProductionSection;
