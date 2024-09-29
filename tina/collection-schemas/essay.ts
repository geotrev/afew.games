import { Collection } from "tinacms"

export const Essay: Collection = {
  label: "Essays",
  name: "essay",
  path: "essays",
  format: "md",
  fields: [
    {
      type: "datetime",
      name: "publish_date",
      label: "Publish Date",
      required: true,
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      required: true,
    },
  ],
  ui: {
    router: ({ document }) => `/essays/${document._sys.filename}`,
  },
}
