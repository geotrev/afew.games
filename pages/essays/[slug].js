import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { getEssayData } from "../../lib/get-essay-metadata"

export default function Essay({ entry }) {
  const { asPath } = useRouter()
  const { date } = entry
  const { title, description } = entry.metadata
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetch("/api" + asPath)
      .then(async (res) => {
        return res.json()
      })
      .then((content) => {
        setContent(content)
      })
  }, [asPath])

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
  const { entries } = await getEssayData()
  const paths = entries.map((entry) => ({
    params: { slug: entry.slug },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const { entries } = await getEssayData()
  const entry = entries.find((entry) => entry.slug === slug)
  return { props: { entry } }
}
