import { BASE_TITLE } from "utils/constants"
import { getPlatformList } from "utils/db-helpers"
import { ClientPage } from "./client-page"
import { queryContributors, queryHome } from "./_queries"

export const metadata = {
  alternates: {
    canonical: `https://afew.games`,
  },
  title: `${BASE_TITLE} home`,
  description: "A video game database and blog website",
}

export default async function Page() {
  const query = await queryHome()
  const contributors = await queryContributors()
  const platformList = getPlatformList()

  return (
    <ClientPage
      query={query}
      contributors={contributors}
      platformList={platformList}
    />
  )
}
