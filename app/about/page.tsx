import Link from "next/link"
import { PageHeading } from "../components/page-heading"
import { BASE_TITLE } from "utils/constants"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/about`,
  },
  title: `${BASE_TITLE} about us`,
  description: "Learn more about A Few Games",
}

export default function Page() {
  return (
    <div className="prose max-w-full">
      <PageHeading>About</PageHeading>
      <p>
        <em>A Few Games</em> started as a simple blog & collection website. I
        enjoyed the idea of sharing my game collection, but quickly after
        building the initial version, I wanted to share my (at the time) private
        database of video game print data, not just the specific games I own.
      </p>
      <p>
        Fast forward to today, the site has switched to a public & open source
        database, but with a secondary blog component. My passion is still to
        share interesting & fun history of physical video game history.
      </p>
      <p>
        In other words, I want to answer questions like: What is the distinct
        chronology of a physical game&apos;s printing? What is a given physical
        game&apos;s revision history? How scarce are these different print
        variants?
      </p>
      <p>
        Finally, where do you, the reader/contributor, fit into this? As
        mentioned above, the database is fully open source. You can view both
        the raw data and code at the{" "}
        <Link
          className="link"
          href="https://github.com/geotrev/afew.games"
          rel="noreferrer noopener"
          target="_blank"
        >
          GitHub repository
        </Link>
        . I aim to facilitate an environment where folks can help build a free &
        accessible resource like this, together.
      </p>
      <p>Thanks for reading and I hope to see you around!</p>
      <div className="divider" role="separator" />
      <p className="italic">
        PS: Do you want to see the games I own? I have{" "}
        <Link
          className="link"
          href="https://www.instagram.com/a.few.games/"
          rel="noopener noreferrer"
        >
          an Instagram
        </Link>{" "}
        for that! I&apos;d love to see your games too. Thanks if you decide to
        give a follow. On a related note, sign up for occasional emails with
        updates about new blog posts and database additions. I promise not to
        spam you. ;)
      </p>
    </div>
  )
}
