import { BASE_TITLE } from "utils/constants"
import { PageHeading } from "../_components/page-heading"
import client from "@/tina/__generated__/client"
import { ClientPage } from "./client-page"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/contribute`,
  },
  title: `${BASE_TITLE} contribute`,
  description: "Contribute to A Few Games' video game database",
}

export default async function Page() {
  const query = await client.queries.content({ relativePath: "contribute.md" })

  return (
    <>
      <div className="prose max-w-full">
        <PageHeading>Contribute</PageHeading>
      </div>

      <ClientPage {...query} />
    </>
  )
}
