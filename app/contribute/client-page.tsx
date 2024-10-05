"use client"

import {
  ContentBlocksContribute,
  ContentQuery,
} from "@/tina/__generated__/types"
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
  const blocks: ContentQuery["content"]["blocks"] = data.content.blocks!
  const contributeBlock: ContentBlocksContribute = blocks.find(
    (block) => block?.__typename === "ContentBlocksContribute"
  )!
  const subheading = contributeBlock.subheading

  return (
    <>
      <div className="prose">
        <TinaMarkdown content={subheading} />
      </div>
      <RecaptchaVerifyWrapper>
        <SubmissionForm {...contributeBlock} />
      </RecaptchaVerifyWrapper>
    </>
  )
}
