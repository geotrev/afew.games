import { Collection } from "tinacms"

export const VideoGameDatabase: Collection = {
  label: "VGDB",
  name: "vgdb",
  path: "public/collections/games",
  format: "json",
  fields: [
    {
      type: "string",
      name: "platform",
      label: "Platform",
      required: true,
      isTitle: true,
    },
    {
      type: "object",
      name: "games",
      label: "Games",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.name }
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          required: true,
        },
        {
          type: "object",
          label: "Variants",
          name: "variants",
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: `${item?.product_code || ""} - ${item?.country || ""} - ${item?.notes || ""}`,
              }
            },
          },
          fields: [
            {
              type: "string",
              name: "product_code",
              label: "Product Code",
            },
            {
              type: "string",
              name: "satellite_code",
              label: "Satellite Code",
            },
            {
              type: "string",
              name: "country",
              label: "Country",
              options: [
                "USA",
                "Japan",
                "Mexico",
                "Hong Kong",
                "Peurto Rico",
                "Thailand",
                "Germany",
              ],
            },
            {
              type: "string",
              name: "mpn",
              label: "MPN",
            },
            {
              type: "string",
              name: "notes",
              label: "Notes",
            },
          ],
        },
      ],
    },
  ],
}
