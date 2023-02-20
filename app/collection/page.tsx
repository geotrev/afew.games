import gamesData from "public/games/collection.json"
import { flattenObjectValues, sortByKey } from "lib/helpers"
import { PageHeading, Layout } from "components/global"
import { CollectionWrapper } from "./components/collection-wrapper"

export default function Collection() {
  const games = gamesData.platforms.sort(sortByKey("platform")).map((p) => {
    return {
      platform: p.platform,
      games: p.games.sort(sortByKey("name")),
    }
  })

  const queryData = games.map((p) => {
    return flattenObjectValues(p.games)
  })

  return (
    <Layout>
      <PageHeading
        heading="Collection"
        subheading={`There are X games in this collection.`}
        liveSubheading
      />
      <CollectionWrapper games={games} queryData={queryData} />
    </Layout>
  )
}
