import Link from "next/link"
import { PageHeading } from "./components/page-heading"
import { DatabaseWrapper } from "./components/database-wrapper"
import { transformGameProps, sortByKey } from "utils/helpers"
import { BASE_TITLE } from "utils/constants"
const fs = require("fs")
const glob = require("glob")
import contributorData from "public/collections/contributors.json"
import { DatabasePlatform } from "../types/games"

const files: string[] = glob.sync("../public/collections/games/*.json")
let database: { platforms: DatabasePlatform[] } = { platforms: [] }

files.forEach((filePath) => {
  const data = fs.readFileSync(filePath, "utf8")
  const jsonObject = JSON.parse(data)
  database.platforms.push(jsonObject)
})

export const metadata = {
  alternates: {
    canonical: `https://afew.games`,
  },
  title: `${BASE_TITLE} database`,
  description: "A video game database and blog website",
}

export default function Page() {
  const { games, queryData, count } = transformGameProps(database)

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
          will be specified in the game title.
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
      <DatabaseWrapper games={games} queryData={queryData} />
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
