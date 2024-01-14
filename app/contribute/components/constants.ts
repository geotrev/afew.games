export const FIELD_DATA = [
  {
    label: "Title",
    hint: "Official title of the game, including subtitles.",
    input: { required: true, id: "title" },
  },
  {
    label: "Platform",
    hint: "Specify which console the game released on.",
    input: {
      required: true,
      id: "platform",
    },
  },
  {
    label: "MPN (Manufacture's Part Number)",
    hint: "A code used to identify a product at retail. Each publisher has a different format. If you're not sure about this, leave this blank. Typically found on the back of a game near the UPC.",
    input: { id: "mpn" },
  },
  {
    label: "Country",
    hint: "The country of manufacture. Most games say 'Made in Japan,' 'Made in USA,' etc. If there's no country indicated, leave this blank. The MPN might specify the country, e.g., ending in 'USA,' 'CAN' (Canada), etc.",
    input: { id: "country" },
  },
  {
    label: "Product Code",
    hint: "The unique identifier given to the game during manufacturing. Sometimes called a 'product code.' Typically found on the spine, or the back of a game near the UPC.",
    input: { id: "part" },
  },
  {
    label: "Additional information",
    hint: "Provide links to resources, additional context, or anything else useful to cross-verify this game.",
    input: { id: "notes", is: "textarea" },
  },
  {
    label: "Submitter Credit",
    hint: "Who should A Few Games credit for this submission? An online handle is OK. Leave blank if no credit desired.",
    input: { id: "credit" },
  },
]

export const CONSENT_DATA = [
  {
    id: "terms",
    label: "I agree to A Few Games'",
  },
  {
    id: "consent",
    label:
      "I understand this form will create a GitHub ticket with the provided information, to remain publicly visible for contributor & collector interest",
  },
]
