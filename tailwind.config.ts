import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#06b6d4",
        accent: "#8b5cf6",
        darkBg: "#0f172a",
        lightBg: "#1e293b",
      },
      backgroundImage: {
        "gradient-cover":
          "linear-gradient(90.21deg, rgba(59, 130, 246, 0.5) -5.91%, rgba(139, 92, 246, 0.5) 111.58%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
        "bounce-slow": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
