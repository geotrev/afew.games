export const ColorTriplets = {
  PRIMARY: "134, 60, 221",
  SECONDARY: "48, 181, 50",
  TERTIARY: "48, 150, 197",
  BACKGROUND_COLOR: "1, 0, 18",
  TEXT: "161, 214, 239",
}

export const theme = {
  colors: {
    // Standard palette spread
    primary1: `rgb(${ColorTriplets.PRIMARY})`,
    primary2: `rgba(${ColorTriplets.PRIMARY}, 0.5)`,
    secondary1: `rgb(${ColorTriplets.SECONDARY})`,
    secondary2: `rgba(${ColorTriplets.SECONDARY}, 0.5)`,
    tertiary1: `rgb(${ColorTriplets.TERTIARY})`,
    tertiary2: `rgba(${ColorTriplets.TERTIARY}, 0.5)`,

    // Background
    backgroundColor: `rgb(${ColorTriplets.BACKGROUND_COLOR})`,

    // Text
    text: `rgb(${ColorTriplets.TEXT})`,

    // Color triplets
    triplets: {
      primary: ColorTriplets.PRIMARY,
      secondary: ColorTriplets.SECONDARY,
      tertiary: ColorTriplets.TERTIARY,
      backgroundColor: ColorTriplets.BACKGROUND_COLOR,
      text: ColorTriplets.TEXT,
    },
  },

  fonts: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  },
}
