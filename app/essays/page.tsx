import xss from "xss"
import { PageHeading } from "../components/page-heading"
import { EssayPageData } from "types/essays"
import { getEssayList } from "utils/essay-helpers"
import { BASE_TITLE } from "utils/constants"
import { EssaysWrapper } from "./components/essays-wrapper"

export const dynamic = "force-dynamic"

export const metadata = {
  alternates: {
    canonical: "https://afew.games/essays",
  },
  title: `${BASE_TITLE} essays`,
  description: "Essays about video games, collecting, and nonsense",
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { page: string }
}) {
  const rawPage = searchParams?.page ? xss(searchParams.page) : ""
  const pageInt = parseInt(rawPage, 10)
  const essaysPage =
    !isNaN(pageInt) && pageInt > 0 ? Math.floor(pageInt) - 1 : 0
  const initialData: EssayPageData = getEssayList(essaysPage)

  return (
    <>
      <div className="prose">
        <PageHeading>Essays</PageHeading>
      </div>
      <div className="divider" role="separator" />
      <EssaysWrapper initialData={initialData} />
    </>
  )
}
