import { ClientPage } from "./client-page"
import client from "../../../tina/__generated__/client"
import { queryEssay } from "@/app/_queries"

export async function generateStaticParams() {
  const pages = await client.queries.essayConnection()
  const paths = pages.data?.essayConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }))

  return paths || []
}

export default async function Page({
  params,
}: {
  params: { filename: string[] }
}) {
  const query = await queryEssay(`${params.filename}`)

  return <ClientPage {...query} />
}
