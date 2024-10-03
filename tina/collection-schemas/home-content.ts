import type { Collection } from "tinacms"

export const HomeContent: Collection = {
  name: "home",
  label: "Home",
  path: "content/home",
  format: "md",
  fields: [
    {
      name: "message",
      label: "Message",
      type: "rich-text",
    },
    {
      name: "contribute",
      label: "Contribute",
      type: "rich-text",
    },
  ],
  ui: {
    router: () => "/",
  },
}
