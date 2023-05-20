import { PageHeading } from "components"
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
    <div className="prose max-w-full">
      <PageHeading>Home</PageHeading>
      <p>
        Welcome. This is a video game collecting blog and database. Within
        you&apos;ll find ramblings about what makes game collecting interesting
        and complex. There is also a searchable print variant database for many
        retro and modern games.
      </p>
    </div>
  )
}
