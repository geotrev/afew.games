import { BASE_TITLE } from "utils/constants"
import { PageHeading } from "../_components/page-heading"
import { ClientPage } from "./client-page"
import { queryContribute } from "../_queries"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/contribute`,
  },
  title: `${BASE_TITLE} contribute`,
  description: "Contribute to A Few Games' video game database",
}

export default async function Page() {
  const query = await queryContribute()

  return (
    <>
      <div className="prose max-w-full">
        <PageHeading>Contribute</PageHeading>
      </div>

      <ClientPage {...query} />
    </>
  )
}
