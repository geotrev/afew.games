import { defineConfig } from "tinacms"
import { Essay } from "./collection-schemas/essay"
import { DatabaseContributors } from "./collection-schemas/database-contributors"
import { VideoGameDatabase } from "./collection-schemas/video-game-database"

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
    collections: [Essay, DatabaseContributors, VideoGameDatabase],
  },
})
