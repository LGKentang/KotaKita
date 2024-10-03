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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          1: "#e9ecef",
          2: "#1e3e62",
          3: "#1b3858",
          4: "#18324e",
          5: "#12253b",
          6: "#0f1f31",
        },
      },
    },
  },
  plugins: [],
};
export default config;
