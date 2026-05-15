import { MetadataRoute } from 'next';
import { serviceData } from '@/data/serviceData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hiwood.com';

  // Static routes
  const staticRoutes = [
    '',
    '/catalog',
    '/faq',
    '/store',
    '/contact',
    '/custom-furniture',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic service routes
  const serviceRoutes = Object.keys(serviceData).map((id) => ({
    url: `${baseUrl}/service/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
