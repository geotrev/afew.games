"use client"

import Link from "next/link"
import { Paragraph } from "@zendeskgarden/react-typography"
import { sortByKey } from "utils/helpers"
import contributorData from "public/collections/contributors.json"

export const DatabaseFooter = () => {
  return (
    <>
      <Paragraph>
        <strong>This tool tracks video game variants</strong>, primarily for
        boxes, but inner contents are noted when appropriate. International
        regions are specified in a game&apos;s title or notes.
      </Paragraph>
      <Paragraph>
        Looking for the complete data used by this search tool? It is{" "}
        <Link
          className="focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
          href="https://github.com/geotrev/afew.games/tree/main/public/collections/games"
          target="_blank"
          rel="noopener noreferrer"
        >
          publicly hosted here
        </Link>
        . We request <strong>respectful behavior</strong> and{" "}
        <strong>avoiding abuse</strong> (e.g., using scripts and automated
        tools) of this page.
      </Paragraph>
      <Paragraph className="mb-0">
        <Link
          className="btn btn-secondary btn-sm text-base-100"
          href="/contribute"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute ↗
        </Link>
      </Paragraph>
      <Paragraph className="mt-2 text-sm italic">
        No account required. Credits are listed near the footer of this page.
      </Paragraph>
      <Paragraph className="font-bold">♥ Database Contributors</Paragraph>
      <Paragraph>
        {contributorData.contributors
          .sort(sortByKey("name"))
          .map((contributor) => contributor.name)
          .join(", ")}
      </Paragraph>
    </>
  )
}
