import { transformGameProps } from "utils/helpers"
import { PageHeading } from "app/components"
import { BASE_TITLE } from "utils/constants"
import { CollectionWrapper } from "./components/collection-wrapper"
import gamesData from "public/games/collection.json"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/collection`,
  },
  title: `${BASE_TITLE} collection`,
  description: "A searchable collection of video games",
}

export default function Page() {
  const { games, queryData, count } = transformGameProps(gamesData)

  return (
    <>
      <PageHeading
        heading="Collection"
        subheading={`There are ${count} games in this collection.`}
        liveSubheading
      />
      <CollectionWrapper games={games} queryData={queryData} />
    </>
  )
}
