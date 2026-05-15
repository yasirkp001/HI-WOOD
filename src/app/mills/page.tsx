import React from 'react';
import { Metadata } from 'next';
import MillsClient from './MillsClient';

export const metadata: Metadata = {
  title: 'Timber Mills | HI WOOD Processing',
  description: 'State-of-the-art timber processing and milling facilities by HI WOOD.',
};

export default function MillsPage() {
  return <MillsClient />;
}
