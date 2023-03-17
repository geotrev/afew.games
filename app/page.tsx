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
        subheading="Welcome. This is a video game blog and database. Within you'll find ramblings about what makes game collecting interesting and complex. There is also a searchable print variant database for many retro and modern games."
      />
    </>
  )
}
