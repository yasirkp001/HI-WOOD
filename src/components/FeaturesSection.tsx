import React from 'react';
import { Axe, HardHat, ShieldCheck, Trees } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "PREMIUM TEAK & WOOD",
      description: "Directly sourced high-quality timber ensuring the best durability and finish for your projects.",
      icon: <Trees className="h-16 w-16 text-primary" strokeWidth={1.75} aria-hidden="true" />
    },
    {
      id: 2,
      title: "CERTIFIED QUALITY",
      description: "Rigorous quality checks for moisture, grain, and strength to guarantee long-lasting timber.",
      icon: <ShieldCheck className="h-16 w-16 text-accent" strokeWidth={1.75} aria-hidden="true" />
    },
    {
      id: 3,
      title: "MASTER CRAFTSMEN",
      description: "Skilled carpenters and artisans who bring decades of traditional Kerala expertise to every piece.",
      icon: <HardHat className="h-16 w-16 text-primary" strokeWidth={1.75} aria-hidden="true" />
    },
    {
      id: 4,
      title: "BESPOKE DESIGN",
      description: "Custom-made solutions tailored to your exact measurements and design preferences.",
      icon: <Axe className="h-16 w-16 text-accent" strokeWidth={1.75} aria-hidden="true" />
    }
  ];

  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              <div className="mb-6 flex justify-center items-center h-20">
                {feature.icon}
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-sm tracking-widest mb-4">
                {feature.title}
              </h3>
              <p className="text-[#666666] text-xs leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
