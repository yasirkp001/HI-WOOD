import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [40, 60, 65, 70, 75],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.me; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://image.pollinations.ai https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://image.pollinations.ai; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com; frame-ancestors 'none';",
          }
        ],
      },
    ];
  }
};

export default nextConfig;

