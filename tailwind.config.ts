import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7EB",
        sand: "#00A651",
        peach: "#EB975E",
        terracotta: "#E31E24",
        rust: "#AB4F41",
        maroon: "#5D1F1E",
        primary: "#00A651",
        accent: "#E31E24",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-montserrat)", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [],
} satisfies Config;
