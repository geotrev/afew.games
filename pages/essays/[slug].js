import { Helmet } from "react-helmet"
import Layout from "components/layout"
import classNames from "classnames"
import { getMatchingEssay } from "lib/get-matching-essay"
import styles from "./essay.module.scss"
import Types from "prop-types"

export default function Essay({ title, description, date, content }) {
  function renderEssay() {
    return (
      <>
        <p className={[styles.essayItemTimePara]}>
          Published{" "}
          <time aria-labelledby="essay-heading" dateTime={date}>
            {date}
          </time>
        </p>
        <h1 id="essay-heading" className={styles.essayTitle}>
          {title}
        </h1>
        {description && (
          <p className={classNames(styles.essayDescription, "text-lg")}>
            {description}
          </p>
        )}
        <div
          className={styles.essayBody}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <article>{renderEssay()}</article>
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
