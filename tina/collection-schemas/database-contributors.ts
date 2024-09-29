import { Collection } from "tinacms"

export const DatabaseContributors: Collection = {
  label: "DB Contributors",
  name: "db_contributors",
  path: "public/collections/contributors",
  format: "json",
  fields: [
    {
      label: "Contributors",
      name: "contributors",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: `${item.name}` }
        },
      },
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
          required: true,
          isTitle: true,
        },
      ],
    },
  ],
}
