export const FIELD_DATA = [
  {
    label: { text: "Title", htmlFor: "title" },
    hint: {
      children: "Official title of the game, including subtitles.",
      id: "title-hint",
    },
    input: { required: true, id: "title", "aria-describedby": "title-hint" },
  },
  {
    label: { text: "Platform", htmlFor: "platform" },
    hint: {
      children: "Specify which console the game released on.",
      id: "platform-hint",
    },
    input: {
      required: true,
      id: "platform",
      "aria-describedby": "platform-hint",
    },
  },
  {
    label: { text: "MPN (Manufacturer's Part Number)", htmlFor: "mpn" },
    hint: {
      children:
        "A code used to identify a product at retail. Each publisher has a different format. If you're not sure about this, leave this blank. Typically found on the back of a game near the UPC.",
      id: "mpn-hint",
    },
    input: { id: "mpn", "aria-describedby": "mpn-hint" },
  },
  {
    label: { text: "Country", htmlFor: "country" },
    hint: {
      children:
        "The country of manufacture. Most games say 'Made in Japan,' 'Made in USA,' etc. If there's no country indicated, leave this blank. The MPN might specify the country, e.g., ending in 'USA,' 'CAN' (Canada), etc.",
      id: "country-hint",
    },
    input: { id: "country", "aria-describedby": "country-hint" },
  },
  {
    label: { text: "Part Code", htmlFor: "part-code" },
    hint: {
      children:
        "The unique identifier given to the game during manufacturing. Sometimes called a 'product code.' Typically found on the spine, or the back of a game near the UPC.",
      id: "part-code-hint",
    },
    input: { id: "part-code", "aria-describedby": "part-code-hint" },
  },
  {
    label: { text: "Additional information", htmlFor: "notes" },
    hint: {
      children:
        "Provide links to resources, additional context, or anything else useful to cross-verify this game.",
      id: "notes-hint",
    },
    input: { id: "notes", "aria-describedby": "notes-hint", is: "textarea" },
  },
]

export const CONSENT_DATA = [
  {
    id: "release-box",
    label:
      "By submitting this form, I agree to release the provided information, without consequence or condition, to A Few Games for the sole purpose of publishing to its video game database.",
  },
  {
    id: "terms-box",
    label:
      "I understand that A Few Games may choose to not list all or some of the submitted information if it is deemed inappropriate, incomplete, or inaccurate.",
  },
  {
    id: "consent-box",
    label:
      "I understand that submitting this form will create a public-facing GitHub ticket with the provided information, to remain publicly visible for contributor & collector interest. I understand that I may request deletion of any unintentionally submitted personal information by emailing the owner at contact@afew.games or leaving a comment on the created GitHub issue, in order to specify the scope of deletion.",
  },
]
