import { PageHeading, Layout } from "app/components"
import { BASE_TITLE } from "lib/constants"

export const metadata = {
  alternates: {
    canonical: `https://afew.games`,
  },
  title: `${BASE_TITLE} home`,
  description: "A video game blog & collection website",
}

export default function Page() {
  return (
    <Layout>
      <PageHeading
        heading="Home"
        subheading="Hello and welcome. This is my personal blog and collection website. I
        like to write about, document, and track my video games. I hope you stay
        for a while!"
      />
    </Layout>
  )
}
