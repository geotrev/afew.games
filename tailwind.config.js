/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["night"],
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
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
