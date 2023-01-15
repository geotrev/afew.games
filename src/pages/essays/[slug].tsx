import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import Types from "prop-types"
import { getMatchingEssay } from "lib/get-matching-essay"
import { Layout } from "components/global"
import { EssayContent } from "components/essays"
import { EssayProps } from "types/essays"
import { BASE_TITLE } from "lib/constants"

export default function Essay(props: EssayProps) {
  const { title, description, date, content } = props

  return (
    <Layout>
      <Head>
        <title>{`${BASE_TITLE} ${title}`}</title>
        <meta name="description" content={description} />
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

Essay.propTypes = {
  title: Types.string.isRequired,
  description: Types.string.isRequired,
  date: Types.string.isRequired,
  content: Types.string.isRequired,
}

export async function getServerSideProps({
  res,
  params,
}: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const props = getMatchingEssay(params)

  if (!props) {
    return { notFound: true }
  }

  return { props }
}
