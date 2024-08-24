"use client"

import Link from "next/link"
import { PageHeading } from "../../components/page-heading"
import { Paragraph } from "@zendeskgarden/react-typography"

export const Content = () => (
  <>
    <PageHeading>Contribute</PageHeading>
    <Paragraph>
      Use this form to submit a new game, new game variant, or both, to be added
      to the variant database.
    </Paragraph>
    <Paragraph>
      Looking for the status on a submission?{" "}
      <Link
        className="text-base-100 mb-4"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/geotrev/afew.games/issues"
      >
        View All Submissions ↗
      </Link>
    </Paragraph>
  </>
)
