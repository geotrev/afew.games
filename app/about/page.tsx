import { BASE_TITLE } from "utils/constants"
import client from "@/tina/__generated__/client"
import { ClientPage } from "./client-page"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/about`,
  },
  title: `${BASE_TITLE} about us`,
  description: "Learn more about A Few Games",
}

export default async function Page() {
  const query = await client.queries.content({ relativePath: "about.md" })

  return <ClientPage {...query} />
}
