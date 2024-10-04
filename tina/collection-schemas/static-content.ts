import type { Collection, Template } from "tinacms"

const HomeTemplate: Template = {
  name: "home",
  label: "Home",
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
}

const AboutTemplate: Template = {
  name: "about",
  label: "About",
  fields: [
    {
      name: "content",
      label: "Content",
      type: "rich-text",
    },
  ],
}

export const StaticContent: Collection = {
  name: "content",
  label: "Content",
  path: "content/pages",
  format: "md",
  fields: [
    {
      name: "blocks",
      label: "Blocks",
      type: "object",
      list: true,
      templates: [HomeTemplate, AboutTemplate],
    },
  ],
  ui: {
    router: (props) => {
      if (props.document._sys.filename === "home") {
        return "/"
      }

      return props.document._sys.filename
    },
  },
}
