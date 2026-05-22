"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const transparentPages = ['/', '/custom-furniture', '/contact'];
  const isTransparentPath = pathname ? (transparentPages.includes(pathname) || pathname.startsWith('/service/')) : true;
  const isSolid = isScrolled || !isTransparentPath;
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', megaMenuType: 'services' },
    { name: 'Catalog', href: '/catalog', megaMenuType: 'catalog' },
    { name: 'FAQ', href: '/faq', megaMenuType: 'faq' },
    { name: 'Branches', href: '/store', megaMenuType: 'branches' },
    { name: 'Contact', href: '/contact' },
  ];

  const renderMegaMenu = (type: string) => {
    switch (type) {
      case 'services':
        return (
          <div className="w-[850px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] p-8 flex gap-6 border border-black/5 backdrop-blur-3xl">
            {[
              { title: 'Transportation', href: '/service/transportation', img: '/assets/hiwood_bharatbenz.jpg' },
              { title: 'Mills & Production', href: '/service/mills', img: '/images/hero-bg-2.jpg' },
              { title: 'Custom Furniture', href: '/custom-furniture', img: '/assets/custom_furniture.png' }
            ].map((service) => (
              <Link 
                key={service.title}
                href={service.href} 
                className="flex-1 group/card bg-neutral-50 rounded-3xl overflow-hidden border border-black/5 hover:border-primary/40 transition-all duration-500 flex flex-col relative h-[380px]"
              >
                 <div className="relative h-[75%] w-full overflow-hidden">
                   <Image 
                     src={service.img} 
                     alt={service.title} 
                     fill 
                     sizes="250px"
                     quality={40}
                     className="object-cover transition-transform duration-[1.5s] ease-out group-hover/card:scale-110 opacity-70 group-hover/card:opacity-100" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                 </div>
                 <div className="h-[25%] bg-[#1A1A1A] flex flex-col items-center justify-center p-6 gap-2">
                    <h3 className="text-white text-[10px] font-black tracking-[0.3em] uppercase text-center group-hover/card:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <div className="w-6 h-[1px] bg-white/10 group-hover/card:w-12 group-hover/card:bg-primary transition-all duration-500"></div>
                 </div>
              </Link>
            ))}
          </div>
        );
      case 'catalog':
        return (
          <div className="w-[600px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] p-10 grid grid-cols-2 gap-x-12 gap-y-8 border border-black/5 backdrop-blur-3xl">
            {[
              { name: 'Dining Sets', cat: 'Dining', count: '12 Items' },
              { name: 'Bedroom Furniture', cat: 'Bedroom', count: '08 Items' },
              { name: 'Office Desks', cat: 'Office', count: '05 Items' },
              { name: 'Living Room', cat: 'Living', count: '15 Items' },
              { name: 'Storage Solutions', cat: 'Storage', count: '10 Items' },
              { name: 'Artisan Seating', cat: 'Seating', count: '07 Items' }
            ].map((cat) => (
              <Link key={cat.name} href={`/catalog?category=${cat.cat}`} className="group/item flex flex-col gap-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-900 group-hover/item:text-primary transition-colors">
                  {cat.name}
                </span>
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                  {cat.count}
                </span>
              </Link>
            ))}
            <div className="col-span-2 pt-6 border-t border-black/5">
              <Link href="/catalog" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-colors">
                View Full Catalog <X className="rotate-45" size={12} />
              </Link>
            </div>
          </div>
        );
      case 'branches':
        return (
          <div className="w-[450px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] p-10 flex flex-col gap-8 border border-black/5 backdrop-blur-3xl">
            {[
              { name: 'Palazhi HQ', desc: 'Main Sawmill & Experience Center', status: 'Active' }
            ].map((branch) => (
              <div key={branch.name} className="group/branch flex flex-col gap-1 relative">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-neutral-900">
                    {branch.name}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                  {branch.desc}
                </span>
                <Link href="/store" className="absolute inset-0 z-10" />
              </div>
            ))}
          </div>
        );
      case 'faq':
        return (
          <div className="w-[400px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] p-10 flex flex-col gap-6 border border-black/5 backdrop-blur-3xl">
            <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2">Popular Topics</h4>
            {[
              'Wood Quality & Sourcing',
              'Customization Process',
              'Shipping & Logistics',
              'Warranty & Care'
            ].map((topic) => (
              <Link key={topic} href="/faq" className="text-[11px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest">
                {topic}
              </Link>
            ))}
            <div className="pt-6 border-t border-black/5 mt-2">
              <Link href="/faq" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-colors">
                View All FAQs <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 z-[60] w-full transition-all duration-700 ${
        isSolid ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-b border-black/10 py-4' : 'bg-transparent py-7'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer group block">
              <Logo className={`${isSolid ? 'h-9' : 'h-10'} transition-all duration-300`} />
            </Link>
          </div>

          {/* Desktop Nav Links - Right */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <div key={item.name} className="relative group py-6">
                <Link 
                  href={item.href} 
                  className={`relative text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 py-2 ${
                    isSolid ? 'text-neutral-900 hover:text-primary' : 'text-white hover:text-white/80'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.name}
                    {item.megaMenuType && <ChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300 opacity-50" />}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
                
                {/* Mega Menu Dropdown */}
                {item.megaMenuType && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-[100]">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {renderMegaMenu(item.megaMenuType)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action & Hamburger */}
          <div className="flex items-center gap-6">


            {/* Hamburger button for mobile */}
            <button 
              className={`md:hidden flex items-center p-2 hover:bg-black/5 rounded-full transition-colors ${
                (isSolid || mobileMenuOpen) ? 'text-neutral-900' : 'text-white'
              }`} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[55] transition-all duration-500 md:hidden ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-2xl font-bold tracking-tighter uppercase transition-all duration-500 text-neutral-900 ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="hover:text-primary transition-colors">{item.name}</span>
            </Link>
          ))}

        </nav>
      </div>
    </>
  );
};

export default Navbar;

