import { ClientPage } from "./client-page"
import { queryContributors, queryHome } from "./_queries"
import { getPlatformList } from "./_utils/server-helpers"
import { BASE_TITLE } from "./constants"

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
