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

const ContributeTemplate: Template = {
  name: "contribute",
  label: "Contribute",
  fields: [
    {
      name: "subheading",
      label: "Subheading",
      type: "rich-text",
    },
    {
      name: "formHeader",
      label: "Form Header",
      type: "rich-text",
    },
    {
      name: "formSuccessMessage",
      label: "Form Success Message",
      type: "rich-text",
    },
    {
      name: "formFields",
      label: "Form Fields",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.id} - ${item.type}`,
          }
        },
      },
      fields: [
        {
          name: "required",
          label: "Required",
          type: "boolean",
        },
        {
          name: "type",
          label: "Type",
          type: "string",
          required: true,
          options: ["input", "textarea"],
        },
        {
          name: "id",
          label: "ID",
          type: "string",
          required: true,
        },
        {
          name: "label",
          label: "Label",
          type: "string",
          required: true,
          isTitle: true,
        },
        {
          name: "hint",
          label: "Hint",
          type: "string",
        },
      ],
    },
    {
      name: "consentFields",
      label: "Consent Fields",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.id }
        },
      },
      fields: [
        {
          name: "id",
          label: "ID",
          type: "string",
          required: true,
        },
        {
          name: "label",
          label: "Label",
          type: "string",
          required: true,
          isTitle: true,
        },
        {
          name: "externalLink",
          label: "External Link",
          type: "string",
        },
        {
          name: "externalLinkLabel",
          label: "External Link Label",
          type: "string",
        },
      ],
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
      templates: [HomeTemplate, AboutTemplate, ContributeTemplate],
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
