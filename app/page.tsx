import { PageHeading } from "app/components/page-heading"
import { DatabaseWrapper } from "app/components/database-wrapper"
import { BASE_TITLE } from "utils/constants"
import { getPlatformList } from "utils/db-helpers"
import { DatabaseFooter } from "./components/database-footer"

export const metadata = {
  alternates: {
    canonical: `https://afew.games`,
  },
  title: `${BASE_TITLE} database`,
  description: "A video game database and blog website",
}

const platformList = getPlatformList()

export default function Page() {
  return (
    <>
      <PageHeading>Database</PageHeading>
      <DatabaseWrapper platformList={platformList} />
      <DatabaseFooter />
    </>
  )
}
