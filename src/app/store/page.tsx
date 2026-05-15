import React from 'react';
import { Metadata } from 'next';
import StoreClient from './StoreClient';

export const metadata: Metadata = {
  title: 'Experience Centers | HI WOOD Locations in Kozhikode',
  description: 'Visit our HI WOOD head office and experience centers in Calicut, Palazhi. Explore our premium timber collections and consult with our experts for your next project.',
  keywords: ['HI WOOD showroom Kozhikode', 'timber store Kerala', 'wood experience center', 'HI WOOD Palazhi location'],
  openGraph: {
    title: 'Experience Centers | HI WOOD',
    description: 'Visit our locations to witness the artistry of premium timber processing and handcrafted designs.',
    url: 'https://hiwood.com/store',
    images: ['/images/store.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit HI WOOD | Premium Timber Experience Centers',
    description: 'Explore the finest timber collections in Kerala at our Kozhikode centers.',
    images: ['/images/store.jpg'],
  }
};

export default function StorePage() {
  return <StoreClient />;
}
