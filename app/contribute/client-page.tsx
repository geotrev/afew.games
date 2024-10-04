"use client"

import { ContentQuery } from "@/tina/__generated__/types"
import { RecaptchaVerifyWrapper } from "./_components/recaptcha-verify-wrapper"
import { SubmissionForm } from "./_components/submission-form"
import { useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

interface ContributePageProps {
  data: ContentQuery
  variables: { relativePath: string }
  query: string
}

export const ClientPage = (props: ContributePageProps) => {
  const { data } = useTina(props)

  const blocks = data.content.blocks?.find(
    (block) => block?.__typename === "ContentBlocksContribute"
  )
  const subheading = blocks?.subheading

  return (
    <>
      <div className="prose">
        <TinaMarkdown content={subheading} />
      </div>
      <RecaptchaVerifyWrapper>
        <SubmissionForm blocks={blocks} />
      </RecaptchaVerifyWrapper>
    </>
  )
}
