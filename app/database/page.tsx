import { flattenObjectValues, sortByKey } from "utils/helpers"
import { PageHeading, Layout } from "app/components"
import { BASE_TITLE } from "utils/constants"
import database from "public/database/collection.json"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/database`,
  },
  title: `${BASE_TITLE} database`,
  description: "A database of video game variants",
}

export default function Page() {
  const games = database.platforms.sort(sortByKey("platform")).map((p) => {
    return {
      platform: p.platform,
      games: p.games.sort(sortByKey("name")),
    }
  })

  let gameCount = 0
  const queryData = games.map((p) => {
    gameCount += p.games.length
    return flattenObjectValues(p.games)
  })

  // eslint-disable-next-line no-console
  console.log({ games, queryData })

  return (
    <Layout>
      <PageHeading
        heading="Database"
        subheading={`This database has ${gameCount} games with documented print variants. I'm always adding games to it.`}
      />
    </Layout>
  )
}
