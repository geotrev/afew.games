import { BASE_TITLE } from "utils/constants"
import { getPlatformList } from "utils/db-helpers"
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
  const query = await client.queries.content({ relativePath: "home.md" })
  const contribQuery = await client.queries.db_contributors({
    relativePath: "contributors.json",
  })
  const contributors = contribQuery?.data?.db_contributors?.contributors

  return (
    <ClientPage
      query={query}
      contributors={contributors}
      platformList={platformList}
    />
  )
}
