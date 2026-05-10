import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          black: "#090604",
          espresso: "#1C100A",
          roast: "#3B2316",
          gold: "#C9A45C",
          cream: "#F6EAD2",
          parchment: "#FFF8EA"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        luxury: "0 30px 90px rgba(9, 6, 4, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
