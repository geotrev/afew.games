// get static list of slugs from public/essays/*.md
// list them in increments of 10, use "load more" button
// import PropTypes from "prop-types"
import Link from "next/link"
import { getEssayData } from "../../lib/get-essays"

export default function Essays({ essayData }) {
  const { entries } = essayData
  return (
    <div>
      <h1>Essays</h1>
      <ul>
        {entries.map((entry) => {
          const { path, date, slug } = entry
          const { title } = entry.article.metadata

          return (
            <li key={slug}>
              <h3>
                <Link href={path}>{title}</Link>
              </h3>
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
