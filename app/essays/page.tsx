import client from "@/tina/__generated__/client"
import { Essay, EssayPageData } from "types/essays"
import { BASE_TITLE } from "utils/constants"
import { PageHeading } from "../_components/page-heading"
import { EssaysWrapper } from "./_components/essays-wrapper"

export const dynamic = "force-dynamic"

export const metadata = {
  alternates: {
    canonical: "https://afew.games/essays",
  },
  title: `${BASE_TITLE} essays`,
  description: "Essays about video games, collecting, and nonsense",
}

export default async function Page() {
  const pages = await client.queries.essayConnection({
    sort: "publish_date",
    last: 5,
  })
  const essays = pages.data?.essayConnection?.edges?.map((edge) => {
    return {
      slug: edge?.node?._sys.filename,
      urlPath: `/essays/${edge?.node?._sys.filename}`,
      date: edge?.node?.publish_date
        ? new Date(edge.node.publish_date)
            .toLocaleDateString()
            .replace(/\//g, "-")
        : null,
      title: edge?.node?.title,
      description: edge?.node?.description,
    }
  })

  const initialData: EssayPageData = {
    index: 0,
    essays: essays as Essay[],
    totalPages: 5,
  }

  return (
    <>
      <div className="prose">
        <PageHeading>Essays</PageHeading>
      </div>
      <EssaysWrapper initialData={initialData} />
    </>
  )
}
