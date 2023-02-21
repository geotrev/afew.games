import { PageHeading, Layout } from "app/components"
import { Essays } from "./components/essays"
import { EssayPageData } from "types/essays"
import { getEssayList } from "lib/get-essay-list"
import { BASE_TITLE } from "lib/constants"

const DEFAULT_PAGE = 0

export const metadata = {
  alternates: {
    canonical: `https://afew.games/essays`,
  },
  title: `${BASE_TITLE} essays`,
  description: "Essays about video games, collecting, and nonsense",
}

export default async function Page() {
  const initialData = (await getEssayList(DEFAULT_PAGE)) as EssayPageData

  return (
    <Layout>
      <PageHeading heading="Essays" />
      <Essays initialData={initialData} />
    </Layout>
  )
}
