import { Metadata } from "next"
import { ClientPage } from "./client-page"
import client from "@/tina/__generated__/client"
import { queryEssay } from "@/src/server/queries"
import { BASE_TITLE } from "../../constants"

type Props = {
  params: { filename: string }
}

export async function generateStaticParams() {
  const pages = await client.queries.essayConnection()
  const paths = pages.data?.essayConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }))

  return paths || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = await queryEssay(`${params.filename}`)

  return {
    alternates: {
      canonical: `https://afew.games/essays/${params.filename}`,
    },
    title: `${BASE_TITLE} ${query.data.essay.title}`,
    description: query.data.essay.description,
  }
}

export default async function Page({
  params,
}: {
  params: { filename: string[] }
}) {
  const query = await queryEssay(`${params.filename}`)

  return <ClientPage {...query} />
}
