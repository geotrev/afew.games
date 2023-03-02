import { transformGameProps } from "utils/helpers"
import { PageHeading, Layout } from "app/components"
import { DatabaseWrapper } from "./components/database-wrapper"
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
  const { games, queryData, count } = transformGameProps(database)

  return (
    <Layout>
      <PageHeading
        heading="Database"
        subheading={`This is a database of games I've researched over the months. It has ${count} games with documented print variants. While I'll always write about future entries and interesting variants, this database will always update in real time.`}
      />
      <DatabaseWrapper games={games} queryData={queryData} />
    </Layout>
  )
}
