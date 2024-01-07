import Link from "next/link"
import xss from "xss"
import { PageHeading } from "./components/page-heading"
import { DatabaseWrapper } from "./components/database-wrapper"
import { transformGameProps, sortByKey } from "utils/helpers"
import { BASE_TITLE } from "utils/constants"
import database from "public/collections/video-game-database.json"
import contributorData from "public/collections/contributors.json"

export const metadata = {
  alternates: {
    canonical: `https://afew.games`,
  },
  title: `${BASE_TITLE} database`,
  description: "A video game database and blog website",
}

export default function Page({
  searchParams,
}: {
  searchParams?: { search: string; platform: string }
}) {
  const { games, queryData, count } = transformGameProps(database)
  const searchQuery = searchParams?.search ? xss(searchParams.search) : ""
  const platformQuery = Array.isArray(searchParams?.platform)
    ? searchParams.platform.map((p) => xss(p).toLowerCase())
    : searchParams?.platform
      ? [xss(searchParams?.platform).toLowerCase()]
      : []

  return (
    <>
      <div className="prose max-w-full">
        <PageHeading>Database</PageHeading>
        <p>
          This is a database of {count} games with documented print variants.{" "}
          <strong>
            This tool exclusively tracks box and seal variants for NTSC-U games
          </strong>
          , but inner contents are noted when appropriate. International regions
          will be specified in the &quot;notes&quot; column.
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
      <DatabaseWrapper
        games={games}
        queryData={queryData}
        searchQuery={searchQuery}
        platformQuery={platformQuery}
      />
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
