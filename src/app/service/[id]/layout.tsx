import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

const serviceData: Record<string, string> = {
  'hi-wood': 'HI WOOD - Modern Woodworking',
  'transportation': 'Logistics & Transportation',
  'moisture-and-drying': 'Moisture Control & Kiln Drying',
  'project-logistics': 'Project Logistics & Management',
  'quality-assurance': 'Quality Assurance & Certification'
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const title = serviceData[id] || "Service Detail";
  const description = `Learn more about our ${title} services at HI WOOD. Premium timber solutions in Kozhikode, Kerala.`;
  return {
    title,
    description,
    keywords: ["HI WOOD", "timber services", "wood milling", "Kozhikode", "custom furniture", "logistics", "drying", "quality assurance"],
    openGraph: {
      title,
      description,
      url: `https://hiwood.com/service/${id}`,
      siteName: "HI WOOD",
      images: [
        {
          url: "https://hiwood.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${title} - HI WOOD`
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://hiwood.com/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
