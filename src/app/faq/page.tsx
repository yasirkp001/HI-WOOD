import React from 'react';
import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | HI WOOD Timber Services',
  description: 'Find answers to common questions about HI WOOD timber quality, our custom furniture process, lead times, and Bharat Benz logistics solutions across Kerala.',
  keywords: ['timber FAQ Kerala', 'custom furniture process', 'wood seasoning questions', 'HI WOOD delivery logistics'],
  openGraph: {
    title: 'FAQ | HI WOOD Timber Knowledge Base',
    description: 'Everything you need to know about our premium wood services and handcrafted furniture process.',
    url: 'https://hiwood.com/faq',
  },
  twitter: {
    card: 'summary',
    title: 'HI WOOD FAQ | Timber & Furniture Guide',
    description: 'Expert answers to your woodworking and timber logistics questions.',
  }
};

export default function FAQPage() {
  return <FAQClient />;
}
