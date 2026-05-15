import { MotionDiv } from "./animations/MotionWrapper";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden font-sans min-h-screen flex items-center bg-white"
    >
      {/* Background SVG Rings */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] pointer-events-none opacity-[0.03]">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-black"
        >
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={10 + i * 5}
              stroke="currentColor"
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Column: Large Image */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-[45%]"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Image
                src="/images/about-logs.jpg"
                alt="High-quality timber logs at HI WOOD workshop"
                width={800}
                height={600}
                className="relative w-full h-full object-cover rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:scale-[1.02]"
              />
              {/* Floating Badge */}
              <MotionDiv
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="absolute -bottom-10 -right-10 w-40 h-40 xl:w-48 xl:h-48 rounded-full bg-white border border-neutral-100 flex flex-col items-center justify-center text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20"
              >
                <span className="text-5xl xl:text-6xl font-medium mb-1 text-accent">
                  16
                </span>
                <span className="text-[9px] xl:text-[10px] font-bold tracking-[0.15em] uppercase text-center leading-tight text-neutral-500">
                  Years of <br /> Experience
                </span>
              </MotionDiv>
            </div>
          </MotionDiv>

          {/* Right Column: Text & Content */}
          <div className="w-full lg:w-[55%] flex flex-col">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-[52rem] mb-12"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-600">
                  Legacy & Innovation
                </p>
              </div>

              <h2 className="text-[2.6rem] lg:text-[4rem] font-bold text-neutral-900 leading-[1.05] mb-8 tracking-tighter">
                THE ART OF <br />
                <span className="text-primary">PREMIUM WOODWORKING</span>
              </h2>

              <p className="text-lg text-neutral-600 leading-relaxed font-light mb-12 border-l-2 border-primary/30 pl-8">
                Since 1998, HI WOOD has been at the forefront of Kerala&apos;s timber industry. We specialize in the complete lifecycle of wood—from sourcing sustainable logs and advanced kiln-seasoning to the creation of bespoke furniture that lasts a lifetime. Our process blends the wisdom of traditional artisans with the precision of modern industrial milling.
              </p>
            </MotionDiv>

            <div className="flex gap-6 lg:gap-8 mt-auto">
              {[
                {
                  src: "/images/timber-stack.jpg",
                  alt: "Stacks of high-quality seasoned timber at HI WOOD sawmill",
                },
                {
                  src: "/images/about-sub-1.jpg",
                  alt: "Precision woodworking tools and custom furniture components",
                },
              ].map((img, i) => (
                <MotionDiv
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
                  className="w-1/2 aspect-[4/3] relative group overflow-hidden rounded-[2rem] shadow-lg"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
