import { PageHeading } from "app/components"
import { BASE_TITLE } from "utils/constants"

export const metadata = {
  alternates: {
    canonical: `https://afew.games`,
  },
  title: `${BASE_TITLE} home`,
  description: "A video game blog, database, and collection website",
}

export default function Page() {
  return (
    <>
      <PageHeading
        heading="Home"
        subheading="Hello and welcome. This is my personal blog, database, and collection website. I
        like to write about, document, and track my video games. I hope you stay
        for a while!"
      />
    </>
  )
}
