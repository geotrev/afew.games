import { defineConfig } from "tinacms"
import { Essay } from "./collection-schemas/essay"
import { DatabaseContributors } from "./collection-schemas/database-contributors"
import { VideoGameDatabase } from "./collection-schemas/video-game-database"
import { StaticContent } from "./collection-schemas/static-content"

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
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
      StaticContent,
      Essay,
      DatabaseContributors,
      VideoGameDatabase,
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_INDEXER_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
})
