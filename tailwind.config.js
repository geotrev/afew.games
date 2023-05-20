/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        few: {
          primary: "#863cdd",
          secondary: "#93c5fd",
          accent: "#34d399",
          neutral: "#1f2937",
          "base-100": "#0f172a",
          info: "#7dd3fc",
          success: "#10b981",
          warning: "#a3e635",
          error: "#fb7185",
        },
      },
    ],
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        page: "800px",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
}
