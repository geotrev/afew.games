import type { Config } from "tailwindcss"
import TailwindTypographyPlugin from "@tailwindcss/typography"
import DaisyUiPlugin from "daisyui"

const config = {
  daisyui: {
    themes: ["night"],
  },
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {
        page: "800px",
      },
    },
  },
  plugins: [TailwindTypographyPlugin, DaisyUiPlugin],
} satisfies Config

export default config
