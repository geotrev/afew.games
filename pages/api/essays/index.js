import { promises as fs } from "fs"
import * as parseMarkdown from "gray-matter"
import chunk from "lodash-es/chunk"
import { getEssaysPath } from "lib/get-essays-path"

const MAX_LIST_LENGTH = 5

async function getEntries(pageIdx) {
  const fileNames = (await fs.readdir(getEssaysPath(), "utf8")).sort().reverse()

  const essayData = fileNames.map(async (fileName) => {
    const raw = await fs.readFile(getEssaysPath(fileName), "utf8")
    const { data } = parseMarkdown(raw)
    const [date, rawName] = fileName.split("--")
    const slug = rawName.slice(0, -3)
    const urlPath = `/essays/${slug}`
    return { ...data, metadata: { urlPath, date, slug } }
  })

  const chunked = chunk(essayData, MAX_LIST_LENGTH)
  const totalPages = chunked.length
  if (totalPages > 0) {
    const essays = await Promise.all(chunked[pageIdx])
    return { index: pageIdx, essays, totalPages }
  }
}

export default async function handler(req, res) {
  // eslint-disable-next-line no-console
  console.log("/api/essays", { NODE_ENV: process.env.NODE_ENV })

  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed")
  }

  try {
    if (typeof req.body.pageIdx === "number") {
      const data = await getEntries(req.body.pageIdx)
      return res.status(200).json(data)
    } else {
      throw new Error(
        "Invalid data type given to 'page'. Must be type 'string'."
      )
    }
  } catch (e) {
    return res.status(500)
  }
}
