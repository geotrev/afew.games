import { useState, useEffect } from "react"
import Layout from "components/layout"
import classNames from "classnames"
import { getEssayEntries } from "../../lib/get-essay-entries"
import styles from "./essay.module.scss"

const getParams = (slug) => ({ params: { slug } })

export default function Essay({ urlPath, fileName }) {
  const [essay, setEssay] = useState(null)

  useEffect(() => {
    const url = "/api" + urlPath
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(({ essay }) => {
        setEssay(essay)
      })
      .catch((e) => {
        throw new Error("FETCH ENTRY ERROR:", e)
      })
  }, [urlPath, fileName])

  function renderLoader() {
    return <div>Loading chips...</div>
  }

  function renderEssay() {
    const { title, description, date, content } = essay

    return (
      <>
        <p className={[styles.essayItemTimePara]}>
          <time className={styles.essayItemTime} dateTime={date}>
            {date}
          </time>
        </p>
        <h1 className={styles.essayTitle}>{title}</h1>
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
      <article>{essay ? renderEssay() : renderLoader()}</article>
    </Layout>
  )
}

/**
 * 1. only static load slugs
 * 2. use slug to retrieve full article content after initial load
 *
 * OR
 *
 * 1. use getServerSideProps to compare url/slug to static list of slugs
 * 2a. if slug is valid, fetch article
 * 2b. If slug is invalid, 404 or redirect to /essays
 */

export async function getStaticPaths() {
  const entries = await getEssayEntries()
  const paths = entries.map((entry) => getParams(entry.slug))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const entries = await getEssayEntries()
  const props = entries.find((entry) => entry.slug === slug)
  return { props }
}
