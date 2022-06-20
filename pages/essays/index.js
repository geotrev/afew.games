import Link from "next/link"
import { getEssayData } from "../../lib/get-essay-metadata"

export default function Essays({ essayData }) {
  const { entries } = essayData
  return (
    <div>
      <h1>Essays</h1>
      <ul>
        {entries.map((entry) => {
          const {
            path,
            date,
            slug,
            metadata: { title, description },
          } = entry

          return (
            <li key={slug}>
              <h3>
                <Link href={path}>{title}</Link>
              </h3>
              <p>{description}</p>
              <time dateTime={date}>{date}</time>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: { essayData: await getEssayData() },
  }
}
