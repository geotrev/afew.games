import Link from "next/link"
import { transformGameProps } from "utils/helpers"
import { PageHeading } from "components"
import { BASE_TITLE } from "utils/constants"
import database from "public/database/collection.json"
import { DatabaseWrapper } from "./components/database-wrapper"

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
    <>
      <div className="prose max-w-full">
        <PageHeading>Database</PageHeading>
        <p>
          This is a database of {count} games with documented print variants.
          While new and interesting variants will be written about in long form,
          this database updates in real time.
        </p>
        <p className="mb-0">
          <Link
            href="https://github.com/geotrev/afew.games/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute to the database ↗
          </Link>
        </p>
        <p className="mt-2 text-sm italic">
          To contribute, a (free) GitHub account is required. Credits are listed
          near the footer of this page.
        </p>
      </div>
      <div className="divider" role="separator" />
      <DatabaseWrapper games={games} queryData={queryData} />
    </>
  )
}
