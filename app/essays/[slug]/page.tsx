import { notFound } from "next/navigation"

import { getMatchingEssay } from "utils/essay-helpers"
import { BASE_TITLE } from "utils/constants"
import { EssayProps } from "types/essays"

import { EssayContent } from "./components/essay-content"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const essayData: EssayProps | boolean = getMatchingEssay(params)

  if (!essayData) {
    return {
      title: `${BASE_TITLE} no essay found`,
    }
  }

  const { title, description } = essayData as EssayProps

  return {
    alternates: {
      canonical: `https://afew.games/essays/${params.slug}`,
    },
    title: `${BASE_TITLE} essay: ${title}`,
    description,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const essayData: EssayProps | boolean = getMatchingEssay(params)

  if (!essayData) {
    return notFound()
  }

  const { title, description, date, content } = essayData as EssayProps

  return (
    <>
      <EssayContent
        title={title}
        description={description}
        date={date}
        content={content}
      />
    </>
  )
}
