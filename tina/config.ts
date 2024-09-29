import { defineConfig } from "tinacms"

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "feat/tina" ||
  "main"

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
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
      },
      {
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
      },
      {
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
                return { label: `${item.name}` }
              },
            },
            fields: [
              {
                type: "string",
                label: "Name",
                name: "name",
                required: true,
                isTitle: true,
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
      },
    ],
  },
})
