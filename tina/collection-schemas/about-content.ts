import type { Collection } from "tinacms"

export const AboutContent: Collection = {
  name: "about",
  label: "About",
  path: "content/about",
  format: "md",
  fields: [
    {
      name: "body",
      label: "Body",
      type: "rich-text",
    },
  ],
  ui: {
    router: () => "/about",
  },
}
