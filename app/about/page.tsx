import { BASE_TITLE } from "utils/constants"
import { ClientPage } from "./client-page"
import { queryAbout } from "../_queries"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/about`,
  },
  title: `${BASE_TITLE} about us`,
  description: "Learn more about A Few Games",
}

export default async function Page() {
  const query = await queryAbout()

  return <ClientPage {...query} />
}
