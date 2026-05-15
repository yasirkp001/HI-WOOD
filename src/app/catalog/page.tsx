import React from 'react';
import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Furniture Catalog | Handcrafted Teak, Rosewood & Mahogany',
  description: 'Explore our comprehensive catalog of premium handcrafted furniture. From luxury dining sets to minimalist office desks, discover the perfect timber masterpiece for your space.',
  keywords: ['teak furniture catalog', 'custom rosewood furniture', 'premium timber products', 'handcrafted wood furniture Kerala', 'HI WOOD collection'],
  openGraph: {
    title: 'HI WOOD Furniture Catalog | Premium Timber Collection',
    description: 'Every piece is a testament to our legacy of craftsmanship. Browse our full collection of handcrafted timber furniture.',
    url: 'https://hiwood.com/catalog',
    images: ['/images/furniture-1.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HI WOOD Collection | Premium Handcrafted Furniture',
    description: 'Discover the artistry of Kerala woodworking in our full furniture catalog.',
    images: ['/images/furniture-1.jpg'],
  }
};

export default function CatalogPage() {
  return <CatalogClient />;
}
