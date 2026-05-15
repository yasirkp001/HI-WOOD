import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Get a Quote for Premium Timber | HI WOOD',
  description: 'Have questions about our timber solutions? Contact HI WOOD today for custom log milling, bulk supply, or furniture design inquiries. Located in Palazhi, Kozhikode, Kerala.',
  keywords: ['contact HI WOOD', 'timber quote Kerala', 'wood milling services Kozhikode', 'custom furniture inquiry Kerala'],
  openGraph: {
    title: 'Contact HI WOOD | Timber & Design Experts',
    description: 'Get in touch with our experts for your custom timber and furniture requirements.',
    url: 'https://hiwood.com/contact',
    images: ['/assets/custom_furniture.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact HI WOOD | Premium Timber Solutions',
    description: 'Talk to our timber experts today for your next architectural project.',
    images: ['/assets/custom_furniture.png'],
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
