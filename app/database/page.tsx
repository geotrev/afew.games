import { flattenObjectValues, sortByKey } from "app/utils/helpers"
import { PageHeading, Layout } from "app/components"
import { BASE_TITLE } from "app/utils/constants"
import database from "public/database/collection.json"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/collection`,
  },
  title: `${BASE_TITLE} collection`,
  description: "A searchable collection of video games",
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
        subheading={`This database has ${gameCount} games with documented print variants.`}
      />
    </Layout>
  )
}
