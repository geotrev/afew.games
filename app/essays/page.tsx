import Head from "next/head"
import { PageHeading, Layout } from "app/components"
import { Essays } from "./components/essays"
import { EssayPageData } from "types/essays"
import { getEssayList } from "lib/get-essay-list"
import { BASE_TITLE } from "lib/constants"

const DEFAULT_PAGE = 0

export default async function Page() {
  const initialData = (await getEssayList(DEFAULT_PAGE)) as EssayPageData

  return (
    <Layout>
      <Head>
        <title>{`${BASE_TITLE} essays`}</title>
        <meta
          name="description"
          content="Essays about video games, collecting, and nonsense"
        />
        <link rel="canonical" href="https://afew.games/essays" />
      </Head>
      <PageHeading heading="Essays" />
      <Essays initialData={initialData} />
    </Layout>
  )
}
