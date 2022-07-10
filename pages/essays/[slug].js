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
        <h2>{"By George W."}</h2>
        <div className={styles.essayContent}>
          <div
            className={styles.essayBody}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <hr />
          <p className={styles.essayFooter}>
            <em>
              Have questions or want to fact check me? Feel free to email me at{" "}
              <a href="mailto:contact@afew.games">contact@afew.games</a>.
            </em>
          </p>
          <p className={styles.essayFooter}>
            <em>
              <strong>{"George W."}</strong>{" "}
              {
                "is a web developer by day, and avid game collector by night. He considers himself an amateur blogger and isn't sure why he's writing in the third person here."
              }
            </em>
          </p>
        </div>
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
