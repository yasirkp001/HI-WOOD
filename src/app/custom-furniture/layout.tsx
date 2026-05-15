import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Furniture | Bespoke Handcrafted Designs",
  description: "Bespoke handcrafted furniture from premium timber in Kozhikode. HI WOOD offers unique designs and masterful craftsmanship for your home or office.",
  keywords: ["custom furniture Kozhikode", "handcrafted wood furniture", "bespoke timber pieces", "designer wood furniture Kerala"],
  openGraph: {
    title: "Custom Furniture | HI WOOD",
    description: "Bespoke handcrafted furniture from premium timber. Masterful craftsmanship in every piece.",
    images: ["/assets/custom_furniture.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Furniture | HI WOOD",
    description: "Bespoke handcrafted furniture from premium timber.",
    images: ["/assets/custom_furniture.png"],
  }
};

export default function CustomFurnitureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
