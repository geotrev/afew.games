// Color triplets
// Used for gradients or alpha
export const ColorTriplets = {
  primary: "134, 60, 221",
  secondary: "48, 181, 50",
  tertiary: "48, 150, 197",
  backgroundColor: "1, 0, 18",
  text: "217, 243, 255",
  gray50: "247, 247, 247",
  gray100: "239, 239, 239",
  gray200: "223, 223, 223",
  gray300: "202, 202, 202",
  gray400: "168, 168, 168",
  gray500: "135, 135, 135",
  gray600: "109, 109, 109",
  gray700: "95, 95, 95",
  gray800: "74, 74, 74",
  gray900: "61, 61, 61",
}

export const palette = {
  // Standard palette spread
  primary1: `rgb(${ColorTriplets.primary})`,
  primary2: `rgba(${ColorTriplets.primary}, 0.5)`,
  secondary1: `rgb(${ColorTriplets.secondary})`,
  secondary2: `rgba(${ColorTriplets.secondary}, 0.5)`,
  tertiary1: `rgb(${ColorTriplets.tertiary})`,
  tertiary2: `rgba(${ColorTriplets.tertiary}, 0.5)`,

  // Grayscale
  gray50: `rgb(${ColorTriplets.gray50})`,
  gray100: `rgb(${ColorTriplets.gray100})`,
  gray200: `rgb(${ColorTriplets.gray200})`,
  gray300: `rgb(${ColorTriplets.gray300})`,
  gray400: `rgb(${ColorTriplets.gray400})`,
  gray500: `rgb(${ColorTriplets.gray500})`,
  gray600: `rgb(${ColorTriplets.gray600})`,
  gray700: `rgb(${ColorTriplets.gray700})`,
  gray800: `rgb(${ColorTriplets.gray800})`,
  gray900: `rgb(${ColorTriplets.gray900})`,

  // Background
  backgroundColor: `rgb(${ColorTriplets.backgroundColor})`,

  // Text
  text: `rgb(${ColorTriplets.text})`,
}
