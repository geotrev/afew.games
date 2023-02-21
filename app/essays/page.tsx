import { PageHeading, Layout } from "app/components"
import { Essays } from "./components/essays"
import { EssayPageData } from "app/types/essays"
import { getEssayList } from "app/utils/get-essay-list"
import { BASE_TITLE } from "app/utils/constants"

const DEFAULT_PAGE = 0

export const metadata = {
  alternates: {
    canonical: `https://afew.games/essays`,
  },
  title: `${BASE_TITLE} essays`,
  description: "Essays about video games, collecting, and nonsense",
}

export default async function Page({
  searchParams: { page },
}: {
  searchParams: { page: string }
}) {
  const pageNum = typeof page === "string" ? parseInt(page) : undefined
  const resolvedPageNum =
    typeof pageNum === "number" ? pageNum - 1 : DEFAULT_PAGE
  const initialData = (await getEssayList(resolvedPageNum)) as EssayPageData

  return (
    <Layout>
      <PageHeading heading="Essays" />
      <Essays initialData={initialData} />
    </Layout>
  )
}
