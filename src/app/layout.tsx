import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL('https://hiwood.com'),
  title: {
    default: "HI WOOD | Premium Wood Milling & Timber Solutions in Kozhikode",
    template: "%s | HI WOOD",
  },
  description:
    "HI WOOD offers premium wood milling, custom furniture, and sustainable timber solutions in Palazhi, Kozhikode. Expertly crafted timber from the finest sources.",
  keywords: [
    "wood milling Kozhikode",
    "timber solutions Kerala",
    "custom furniture Palazhi",
    "sawmill Kozhikode",
    "premium timber",
    "sustainable wood",
    "HI WOOD Palazhi",
  ],
  authors: [{ name: "HI WOOD" }],
  creator: "HI WOOD",
  publisher: "HI WOOD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "HI WOOD | Premium Wood Milling & Timber Solutions",
    description:
      "Expertly crafted timber from the finest forest sources in Kozhikode.",
    url: "https://hiwood.com",
    siteName: "HI WOOD",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HI WOOD | Premium Wood Milling & Timber Solutions",
    description:
      "Expertly crafted timber from the finest forest sources in Kozhikode.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-white text-neutral-900 overflow-x-hidden"
      >
        <Navbar />
        <ScrollToTop />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "HI WOOD Timber Solutions",
              "image": "https://hiwood.com/images/hero-bg.png",
              "@id": "https://hiwood.com",
              "url": "https://hiwood.com",
              "telephone": "+918086687342",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Palazhi",
                "addressLocality": "Kozhikode",
                "addressRegion": "Kerala",
                "postalCode": "673014",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.2484,
                "longitude": 75.8507
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.instagram.com/hiwood_palazhi/",
                "https://www.facebook.com/hiwood"
              ]
            })
          }}
        />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
