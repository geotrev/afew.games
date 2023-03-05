export const ColorTriplets = {
  PRIMARY: "134, 60, 221",
  SECONDARY: "48, 181, 50",
  TERTIARY: "48, 150, 197",
  BACKGROUND_COLOR: "1, 0, 18",
  TEXT: "161, 214, 239",
}

export const theme = {
  colors: {
    primary: `rgb(${ColorTriplets.PRIMARY})`,
    primaryAlt: `rgba(${ColorTriplets.PRIMARY}, 0.5)`,
    secondary: `rgb(${ColorTriplets.SECONDARY})`,
    secondaryAlt: `rgba(${ColorTriplets.SECONDARY}, 0.5)`,
    tertiary: `rgb(${ColorTriplets.TERTIARY})`,
    tertiaryAlt: `rgba(${ColorTriplets.TERTIARY}, 0.5)`,

    // Background
    backgroundColor: `rgb(${ColorTriplets.BACKGROUND_COLOR})`,

    // Text
    text: `rgb(${ColorTriplets.TEXT})`,
  },

  fonts: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  },
}
