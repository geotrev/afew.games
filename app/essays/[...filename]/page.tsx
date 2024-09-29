import Essay from "./client-page"
import client from "../../../tina/__generated__/client"

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
  const data = await client.queries.essay({
    relativePath: `${params.filename}.md`,
  })

  return <Essay {...data}></Essay>
}
