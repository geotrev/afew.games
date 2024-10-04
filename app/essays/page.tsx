import { queryEssays } from "@/app/_queries/essays"
import { BASE_TITLE } from "utils/constants"
import { PageHeading } from "../_components/page-heading"
import { ClientPage } from "./client-page"
import { PAGE_SIZE } from "./constants"

export const metadata = {
  alternates: {
    canonical: "https://afew.games/essays",
  },
  title: `${BASE_TITLE} essays`,
  description: "Essays about video games, collecting, and nonsense",
}

export default async function Page() {
  // Fetch the most recent 5 essays
  const query = await queryEssays({
    sort: "publish_date",
  })

  // Return only the most recent five essays
  const essays = query.essays?.reverse().slice(0, 5)
  const pages = query.essays ? Math.ceil(query.essays?.length / PAGE_SIZE) : 0

  return (
    <>
      <div className="prose">
        <PageHeading>Essays</PageHeading>
      </div>
      {essays && <ClientPage essays={essays} pages={pages} />}
    </>
  )
}
