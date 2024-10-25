"use client"

import propTypes from "prop-types"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { EssayQuery, EssayQueryVariables } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"
import { EssayFooter } from "./_components/essay-footer"
import { EssayHeader } from "./_components/essay-header"

interface EssayPageProps {
  data: EssayQuery
  variables: EssayQueryVariables
  query: string
}

export function ClientPage(props: EssayPageProps) {
  const { data } = useTina(props)
  const { title, description, publish_date, body } = data.essay

  return (
    <article>
      <EssayHeader
        title={title}
        description={description}
        date={publish_date}
      />
      <div className="prose prose-zinc max-w-full lg:prose-lg">
        <TinaMarkdown content={body} />
      </div>
      <div role="separator" className="divider" />
      <EssayFooter />
    </article>
  )
}

ClientPage.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  publish_date: propTypes.string,
  body: propTypes.string,
}
