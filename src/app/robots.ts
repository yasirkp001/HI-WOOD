import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'ChatGPT-User', 'Google-Extended'],
        disallow: '/',
      },
      {
        userAgent: 'bingbot',
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://hiwood.com/sitemap.xml',
    host: 'https://hiwood.com',
  };
}
