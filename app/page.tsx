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
      <div className="prose max-w-full">
        <PageHeading>Database</PageHeading>
        <p>
          <strong>
            This tool exclusively tracks box and seal variants for NTSC-U games
          </strong>
          , but inner contents are noted when appropriate. International regions
          will be specified in a game&apos;s title or notes.
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
      <DatabaseWrapper platformList={platformList} />
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
