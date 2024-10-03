import { BASE_TITLE } from "utils/constants"
import { getPlatformList } from "utils/db-helpers"
import contributors from "public/collections/contributors/contributors.json"
import client from "@/tina/__generated__/client"
import { ClientPage } from "./client-page"

export const metadata = {
  alternates: {
    canonical: `https://afew.games`,
  },
  title: `${BASE_TITLE} home`,
  description: "A video game database and blog website",
}

const platformList = getPlatformList()

export default async function Page() {
  const query = await client.queries.home({ relativePath: "content.md" })

  return (
    <ClientPage
      query={query}
      contributors={contributors}
      platformList={platformList}
    />
  )
}
