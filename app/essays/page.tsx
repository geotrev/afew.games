import client from "@/tina/__generated__/client"
import { BASE_TITLE } from "utils/constants"
import { PageHeading } from "../_components/page-heading"
import { Essays, PaginatedEssay } from "./client-page"

export const dynamic = "force-dynamic"

export const metadata = {
  alternates: {
    canonical: "https://afew.games/essays",
  },
  title: `${BASE_TITLE} essays`,
  description: "Essays about video games, collecting, and nonsense",
}

export default async function Page() {
  // Fetch the most recent 5 essays
  const pages = await client.queries.essayConnection({
    sort: "publish_date",
    last: 5,
  })

  // Shape the essay data into a format the UI expects
  // Cursor must be included for pagination
  const essays = pages.data?.essayConnection?.edges?.map((edge) => {
    return {
      cursor: edge?.cursor,
      slug: edge?.node?._sys.filename,
      urlPath: `/essays/${edge?.node?._sys.filename}`,
      date: edge?.node?.publish_date,
      title: edge?.node?.title,
      description: edge?.node?.description,
    }
  })

  return (
    <>
      <div className="prose">
        <PageHeading>Essays</PageHeading>
      </div>
      <Essays essays={essays as PaginatedEssay[]} />
    </>
  )
}
