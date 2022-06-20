import Link from "next/link"
import { getEssayEntries } from "../../lib/get-essay-entries"

export default function Essays({ essayList }) {
  return (
    <div>
      <h1>Essays</h1>
      <ul>
        {essayList.map((entry) => {
          const {
            title,
            description,
            metadata: { urlPath, date, slug },
          } = entry

          return (
            <li key={slug}>
              <h3>
                <Link href={urlPath}>{title}</Link>
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

export async function getServerSideProps() {
  const essayList = await getEssayEntries()
  return { props: { essayList } }
}
