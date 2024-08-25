import Link from "next/link"
import { PageHeading } from "app/components/page-heading"
import { DatabaseWrapper } from "app/components/database-wrapper"
import { sortByKey } from "utils/helpers"
import { BASE_TITLE } from "utils/constants"
import { getPlatformList } from "utils/db-helpers"
import contributorData from "public/collections/contributors.json"

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
      <div className="prose">
        <PageHeading>Database</PageHeading>
      </div>
      <DatabaseWrapper platformList={platformList} />
      <div className="divider" role="separator" />
      <div className="prose max-w-full">
        <p>
          <strong>This tool tracks video game variants</strong>, primarily for
          boxes, but inner contents are noted when appropriate. International
          regions are specified in a game&apos;s title or notes.
        </p>
        <p>
          Looking for the complete data used by this search tool? It is{" "}
          <Link
            className="focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
            href="https://github.com/geotrev/afew.games/tree/main/public/collections/games"
            target="_blank"
            rel="noopener noreferrer"
          >
            publicly hosted here
          </Link>
          . We request <strong>respectful behavior</strong> and{" "}
          <strong>avoiding abuse</strong> (e.g., using scripts and automated
          tools) of this page.
        </p>
        <p className="mb-0">
          <Link
            className="btn btn-secondary btn-sm text-base-100"
            href="/contribute"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute ↗
          </Link>
        </p>
        <p className="mt-2 text-sm italic">
          No account required. Credits are listed near the footer of this page.
        </p>
      </div>
      <div className="divider" role="separator" />
      <div className="prose max-w-full">
        <p className="font-bold">♥ Database Contributors</p>
        <p>
          {contributorData.contributors
            .sort(sortByKey("name"))
            .map((contributor) => contributor.name)
            .join(", ")}
        </p>
      </div>
    </>
  )
}
