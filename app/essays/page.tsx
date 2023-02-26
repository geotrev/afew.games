import { PageHeading, Layout } from "app/components"
import { EssaysWrapper } from "./components/essays-wrapper"
import { EssayPageData } from "app/types/essays"
import { getEssayList } from "app/utils/essay-helpers"
import { BASE_TITLE } from "app/utils/constants"
import xss from "xss"

export const dynamic = "force-dynamic"

const DEFAULT_PAGE = 0

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
    typeof pageInt === "number" && pageInt > 0
      ? Math.floor(pageInt) - 1
      : DEFAULT_PAGE
  const initialData = (await getEssayList(essaysPage)) as EssayPageData

  return (
    <Layout>
      <PageHeading heading="Essays" />
      <EssaysWrapper initialData={initialData} />
    </Layout>
  )
}
