import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with HI WOOD for premium wood milling, custom furniture, and timber inquiries in Kozhikode, Kerala.",
  keywords: ["contact HI WOOD", "sawmill Kozhikode address", "wood milling inquiry", "timber supply Kozhikode"],
  openGraph: {
    title: "Contact HI WOOD",
    description: "Reach out to HI WOOD for premium wood milling and custom furniture services in Kozhikode.",
    url: "https://hiwood.com/contact",
    siteName: "HI WOOD",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Contact HI WOOD",
    description: "Connect with HI WOOD for timber solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
