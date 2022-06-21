import { promises as fs } from "fs"
import path from "path"
import * as parseMarkdown from "gray-matter"
import chunk from "lodash-es/chunk"

async function getEntries(pageIdx) {
  const fileNames = (
    await fs.readdir(path.resolve(process.cwd(), "public", "essays"), "utf8")
  )
    .sort()
    .reverse()

  const essayData = fileNames.map(async (fileName) => {
    const raw = await fs.readFile(
      path.resolve(process.cwd(), "public", "essays", fileName),
      "utf8"
    )
    const { data } = parseMarkdown(raw)
    const [date, rawName] = fileName.split("--")
    const slug = rawName.slice(0, -3)
    const urlPath = `/essays/${slug}`
    return { ...data, metadata: { urlPath, date, slug } }
  })

  const chunked = chunk(essayData, 10)
  const count = chunked.length
  if (count > 0) {
    const essays = await Promise.all(chunked[pageIdx])
    return { essays, count }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed")
  }

  const data = await getEntries(req.body.pageIdx)
  if (!data) {
    return res.status(500)
  }

  return res.status(200).json(data)
}
