import { ColorTriplets, palette } from "./palette"

export const theme = {
  colors: {
    ...palette,
    triplets: ColorTriplets,
  },
  fonts: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  },
}
