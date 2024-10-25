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

// export const metadata = ({ filename }: { filename: string[] }) => {
//   return {
//     title: filename.join("/"),
//     description: "A few games",
//   }
// }

export default async function Page({
  params,
}: {
  params: { filename: string[] }
}) {
  const query = await queryEssay(`${params.filename}`)

  return <ClientPage {...query} />
}
