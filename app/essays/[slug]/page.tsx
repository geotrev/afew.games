import { notFound } from "next/navigation"
import { getMatchingEssay } from "app/utils/get-matching-essay"
import { Layout } from "app/components"
import { EssayContent } from "../components/essay-content"
import { BASE_TITLE } from "app/utils/constants"
import { EssayProps } from "app/types/essays"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const essayData: EssayProps | boolean = getMatchingEssay(params)

  if (!essayData) {
    return {
      title: "Not found",
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
    <Layout>
      <EssayContent
        title={title}
        description={description}
        date={date}
        content={content}
      />
    </Layout>
  )
}
