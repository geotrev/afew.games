import { useState, useEffect } from "react"
import { getEssayEntries } from "../../lib/get-essay-entries"

const getParams = (slug) => ({ params: { slug } })

export default function Essay({ entry }) {
  const { title, description } = entry
  const { date, fileName, urlPath } = entry.metadata
  const [content, setContent] = useState(null)

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
      .then(({ content }) => {
        setContent(content)
      })
      .catch((e) => {
        throw new Error(e)
      })
  }, [urlPath, fileName])

  return (
    <article>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <time dateTime={date}>{date}</time>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </article>
  )
}

export async function getStaticPaths() {
  const entries = await getEssayEntries()
  const paths = entries.map((entry) => getParams(entry.metadata.slug))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug } }) {
  const entries = await getEssayEntries()
  const entry = entries.find((entry) => entry.metadata.slug === slug)
  return { props: { entry } }
}
