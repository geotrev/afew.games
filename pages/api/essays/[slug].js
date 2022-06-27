import { promises as fs } from "fs"
import * as parseMarkdown from "gray-matter"
import { marked } from "marked"
import { getEssaysPath } from "../../../lib/get-essays-path"

async function getEntry(fileName) {
  const raw = await fs.readFile(getEssaysPath(fileName), "utf8")
  const { data, content: markdownContent } = parseMarkdown(raw)
  const content = marked.parse(markdownContent)
  const [date] = fileName.split("--")
  return { ...data, date, content }
}

export default async function handler(req, res) {
  // eslint-disable-next-line no-console
  console.log(`/api/essays/${req.query.slug}`, {
    NODE_ENV: process.env.NODE_ENV,
  })

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }

  const essay = await getEntry(req.body.fileName)
  if (!essay) {
    return res.status(500)
  }

  return res.status(200).json({ essay })
}
