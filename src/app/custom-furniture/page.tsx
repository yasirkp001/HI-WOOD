import { Metadata } from 'next';
import CustomFurnitureClient from './CustomFurnitureClient';

export const metadata: Metadata = {
  title: 'Custom Furniture Design | Handcrafted Bespoke Woodwork | HI WOOD',
  description: 'Transform your vision into reality with HI WOOD. We build custom dining tables, bed frames, wardrobes, and sofa sets tailored to your space, style, and wood choice in Kerala.',
  keywords: ['custom furniture design Kerala', 'bespoke woodworking', 'luxury dining tables', 'handcrafted bed frames', 'Kozhikode furniture artisans'],
  openGraph: {
    title: 'Custom Furniture Design | HI WOOD Masterpieces',
    description: 'Bespoke furniture crafted from premium Teak, Rosewood, and Mahogany. Your design, our hands.',
    url: 'https://hiwood.com/custom-furniture',
    images: ['/assets/custom_furniture.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HI WOOD | Bespoke Custom Furniture',
    description: 'Luxury handcrafted furniture tailored to your exact needs and wood preferences.',
    images: ['/assets/custom_furniture.png'],
  }
};

export default function CustomFurniturePage() {
  return <CustomFurnitureClient />;
}
