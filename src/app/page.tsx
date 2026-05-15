import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import { Metadata } from 'next';

const AboutSection = dynamic(() => import('@/components/AboutSection'));
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'));
const TimberProductionSection = dynamic(() => import('@/components/TimberProductionSection'));
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));
const VideoBannerSection = dynamic(() => import('@/components/VideoBannerSection'));
const AppointmentSection = dynamic(() => import('@/components/AppointmentSection'));

export const metadata: Metadata = {
  title: 'HI WOOD | Premium Timber, Precision Milling & Custom Furniture',
  description: 'Kerala\'s leading timber experts specializing in high-precision log milling, kiln drying, and handcrafted custom furniture. Premium Teak, Rosewood, and Mahogany solutions.',
  keywords: ['timber milling Kerala', 'custom furniture Kozhikode', 'teak wood suppliers', 'kiln dried timber', 'HI WOOD Palazhi'],
  openGraph: {
    title: 'HI WOOD | Premium Timber & Furniture Solutions',
    description: 'Transforming raw logs into architectural masterpieces with precision and passion since 1998.',
    url: 'https://hiwood.com',
    siteName: 'HI WOOD',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'HI WOOD Premium Timber',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HI WOOD | Premium Timber Solutions',
    description: 'Master artisans of Kerala providing elite timber and custom furniture.',
    images: ['/images/hero-bg.png'],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TimberProductionSection />
      <TestimonialsSection />
      <VideoBannerSection />
      <AppointmentSection />
    </>
  );
}
