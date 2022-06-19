import { getEssayData } from "../../lib/get-essays"

export default function Essay({ entry }) {
  const { metadata, content } = entry.article
  const { title, description } = metadata
  return (
    <article>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
