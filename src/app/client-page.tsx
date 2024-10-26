"use client"

import { TinaMarkdown } from "tinacms/dist/rich-text"
import { tinaField, useTina } from "tinacms/dist/react"
import Link from "next/link"
import { DatabaseWrapper } from "./_components/database-wrapper"
import { PageHeading } from "./_components/page-heading"
import {
  ContentQuery,
  ContentQueryVariables,
  Db_ContributorsQuery,
} from "@/tina/__generated__/types"
import { sortByKey } from "@/src/app/_utils/helpers"

interface HomePageProps {
  query: {
    data: ContentQuery
    variables: ContentQueryVariables
    query: string
  }
  platformList: string[]
  contributors: Db_ContributorsQuery["db_contributors"]["contributors"]
}

export const ClientPage = ({
  query,
  platformList,
  contributors,
}: HomePageProps) => {
  const { data } = useTina(query)

  const blocks = data?.content?.blocks?.find(
    (block) => block?.__typename === "ContentBlocksHome"
  )
  const message = blocks?.message
  const contribute = blocks?.contribute

  return (
    <>
      <div className="prose sr-only">
        <PageHeading>Database</PageHeading>
      </div>
      <DatabaseWrapper platformList={platformList} />
      <div className="divider" role="separator" />
      <div className="prose max-w-full">
        <div data-tina-field={tinaField(blocks, "message")}>
          <TinaMarkdown content={message} />
        </div>
        <p className="mb-0">
          <Link
            className="btn btn-secondary btn-sm text-base-100"
            href="/contribute"
            rel="noopener noreferrer"
          >
            Contribute ↗
          </Link>
        </p>
        <div
          className="mt-2 text-sm italic"
          data-tina-field={tinaField(blocks, "contribute")}
        >
          <TinaMarkdown content={contribute} />
        </div>
      </div>
      <div className="divider" role="separator" />
      <div className="prose max-w-full">
        <p className="font-bold">♥ Database Contributors</p>
        <p>
          {contributors
            ?.sort(sortByKey("name"))
            .map((contributor) => contributor?.name)
            .join(", ")}
        </p>
      </div>
    </>
  )
}
