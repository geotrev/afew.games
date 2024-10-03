import { queryEssays } from "@/app/_queries/essays"
import { BASE_TITLE } from "utils/constants"
import { PageHeading } from "../_components/page-heading"
import { Essays } from "./client-page"
import { PAGE_SIZE } from "./constants"

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
  const result = await queryEssays({
    sort: "publish_date",
  })

  const essays = result.essays?.slice(-5).reverse()
  const pages = result.essays ? Math.ceil(result.essays?.length / PAGE_SIZE) : 0

  return (
    <>
      <div className="prose">
        <PageHeading>Essays</PageHeading>
      </div>
      {essays && <Essays essays={essays} pages={pages} />}
    </>
  )
}
