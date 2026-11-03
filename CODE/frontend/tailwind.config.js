/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          canvas: "#F8FAFC",     // Soft Powder Canvas
          card: "#FFFFFF",       // Pure White Card
          border: "#E2E8F0",     // Pastel Slate Border
          navy: "#1E3A8A",       // Deep Executive Navy
          blue: "#3B82F6",       // Primary Interactive Blue
          sky: "#7DD3FC",        // Baby Sky (Prophet Confidence Band)
          mint: "#86EFAC",       // Mint Green
          mintBg: "#DCFCE7",     // Soft Mint Background
          mintText: "#15803D",   // High contrast green text
          peach: "#FDBA74",      // Peach Orange (Plan/Target)
          peachBg: "#FFEDD5",    // Soft Peach Background
          peachText: "#C2410C",  // High contrast peach text
          lavender: "#D8B4FE",   // Soft Lavender (What-If / AI)
          lavenderBg: "#F3E8FF", // Soft Lavender Background
          lavenderText: "#6B21A8",// High contrast purple text
          coral: "#FECDD3",      // Soft Coral Red (Red flag/Variance)
          coralBg: "#FEE2E2",    // Soft Coral Background
          coralText: "#B91C1C",  // High contrast red text
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pastel': '0 4px 20px -2px rgba(148, 163, 184, 0.12)',
        'pastel-hover': '0 10px 25px -3px rgba(148, 163, 184, 0.20)',
      }
    },
  },
  plugins: [],
}
