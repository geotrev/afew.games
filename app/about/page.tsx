import { PageHeading } from "../components/page-heading"
import { BASE_TITLE } from "utils/constants"
import { Content } from "./components/content"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/about`,
  },
  title: `${BASE_TITLE} about us`,
  description: "Learn more about A Few Games",
}

export default function Page() {
  return (
    <>
      <PageHeading>About</PageHeading>
      <Content />
    </>
  )
}
