"use client"

import { ContentQuery } from "@/tina/__generated__/types"
import { PageHeading } from "../_components/page-heading"
import { tinaField, useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

interface AboutPageProps {
  data: ContentQuery
  variables: { relativePath: string }
  query: string
}

export const ClientPage = (props: AboutPageProps) => {
  const { data } = useTina(props)

  const blocks = data?.content?.blocks?.find(
    (block) => block?.__typename === "ContentBlocksAbout"
  )
  const content = blocks?.content

  return (
    <div className="prose max-w-full">
      <PageHeading>About</PageHeading>
      <div data-tina-field={tinaField(blocks, "content")}>
        <TinaMarkdown content={content} />
      </div>
    </div>
  )
}
