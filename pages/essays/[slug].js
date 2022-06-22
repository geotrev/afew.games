import { useState, useEffect } from "react"
import Layout from "components/layout"
import { getEssayEntries } from "../../lib/get-essay-entries"

const getParams = (slug) => ({ params: { slug } })

export default function Essay({ metadata }) {
  const { urlPath, fileName } = metadata
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
        <time dateTime={date}>{date}</time>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
  const paths = entries.map((entry) => getParams(entry.metadata.slug))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const entries = await getEssayEntries()
  const { metadata } = entries.find((entry) => entry.metadata.slug === slug)
  return { props: { metadata } }
}
