import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { serviceData } from '@/data/serviceData';
import ServiceDetailClient from './ServiceDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = serviceData[id.toLowerCase()];

  if (!service) {
    return {
      title: 'Service Not Found | HI WOOD',
      description: 'The requested service could not be found.'
    };
  }

  return {
    title: `${service.title} | Premium Timber Solutions`,
    description: service.description.substring(0, 160),
    openGraph: {
      title: `${service.title} | HI WOOD`,
      description: service.description.substring(0, 160),
      images: [service.heroImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | HI WOOD`,
      description: service.description.substring(0, 160),
      images: [service.heroImage],
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = serviceData[id.toLowerCase()];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4 font-bold">Service Not Found</h2>
          <Link href="/" className="text-primary hover:text-accent transition-colors underline decoration-primary underline-offset-4">Back to Home</Link>
        </div>
      </div>
    );
  }

  return <ServiceDetailClient id={id} />;
}
