import { flattenObjectValues, sortByKey } from "lib/helpers"
import { PageHeading, Layout } from "app/components"
import { CollectionWrapper } from "./components/collection-wrapper"
import gamesData from "public/games/collection.json"
import { BASE_TITLE } from "lib/constants"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/collection`,
  },
  title: `${BASE_TITLE} collection`,
  description: "A searchable collection of video games",
}

export default function Page() {
  const games = gamesData.platforms.sort(sortByKey("platform")).map((p) => {
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

  return (
    <Layout>
      <PageHeading
        heading="Collection"
        subheading={`There are ${gameCount} games in this collection.`}
        liveSubheading
      />
      <CollectionWrapper games={games} queryData={queryData} />
    </Layout>
  )
}
