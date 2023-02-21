import Head from "next/head"
import { notFound } from "next/navigation"
import { getMatchingEssay } from "lib/get-matching-essay"
import { Layout } from "app/components"
import { EssayContent } from "../components/essay-content"
import { BASE_TITLE } from "lib/constants"
import { EssayProps } from "types/essays"

export default function Page({ params }: { params: { slug: string } }) {
  const essayData: EssayProps | boolean = getMatchingEssay(params)

  if (!essayData) {
    return notFound()
  }

  const { title, description, date, content } = essayData as EssayProps

  return (
    <Layout>
      <Head>
        <title>{`${BASE_TITLE} essay: ${title}`}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={`https://afew.games/essays/${params.slug}`}
        />
      </Head>
      <EssayContent
        title={title}
        description={description}
        date={date}
        content={content}
      />
    </Layout>
  )
}
