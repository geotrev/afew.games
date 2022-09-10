import { Helmet } from "react-helmet"
import Types from "prop-types"
import { getMatchingEssay } from "lib/get-matching-essay"
import { Layout } from "components/global"
import { EssayContent } from "components/essays"

export default function Essay(props) {
  const { title, description } = props

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <EssayContent {...props} />
    </Layout>
  )
}

Essay.propTypes = {
  title: Types.string.isRequired,
  description: Types.string.isRequired,
  date: Types.string.isRequired,
  content: Types.string.isRequired,
}

export async function getServerSideProps({ res, params }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const props = await getMatchingEssay(params)

  if (!props) {
    return { notFound: true }
  }

  return { props }
}
