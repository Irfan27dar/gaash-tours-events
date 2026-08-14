import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Brand tokens — mirrored as CSS variables in globals.css
        ink: {
          DEFAULT: "#141414",
          soft: "#1E1E1E",
          muted: "#3A3A3A",
        },
        cloud: {
          DEFAULT: "#F7F7F5",
          deep: "#EFEEE9",
        },
        saffron: {
          DEFAULT: "#FFD200",
          deep: "#E8B400",
          soft: "#FFE87A",
        },
        pine: {
          DEFAULT: "#123A2E",
          deep: "#0C2A20",
          soft: "#1C5442",
        },
        line: "rgba(20,20,20,0.10)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 2vw, 1.6rem)", { lineHeight: "1.2" }],
        lead: ["clamp(1.05rem, 1.4vw, 1.3rem)", { lineHeight: "1.6" }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(20,20,20,0.05), 0 12px 32px rgba(20,20,20,0.07)",
        lift: "0 8px 20px rgba(20,20,20,0.10), 0 24px 60px rgba(20,20,20,0.14)",
        glow: "0 10px 40px rgba(255,210,0,0.28)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
