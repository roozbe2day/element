import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1F3B",
          950: "#071730",
          900: "#0A1F3B",
          800: "#0E2A4E",
          700: "#153560",
        },
        gold: {
          DEFAULT: "#C8A97E",
          soft: "#D9C3A0",
          dark: "#AE8F63",
        },
        ink: "#0B1727",
        ivory: "#F7F5F1",
        mist: "#EEF3F8",
        muted: "#5B6675",
        line: "#E7E3DC",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      maxWidth: {
        shell: "1280px",
      },
      boxShadow: {
        soft: "0 24px 60px -30px rgba(10,31,59,0.35)",
        card: "0 18px 44px -26px rgba(10,31,59,0.45)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "slow-zoom": "slow-zoom 2.4s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
