import { promises as fs } from "fs"
import path from "path"
import * as parseMarkdown from "gray-matter"
import { marked } from "marked"

async function getContent(essaysDir, fileName) {
  const raw = await fs.readFile(path.resolve(essaysDir, fileName), "utf8")
  const { content: markdownContent } = parseMarkdown(raw)
  const content = marked.parse(markdownContent)
  return content
}

async function getEntry(slug) {
  const essaysDir = path.resolve(process.cwd(), "public/essays")
  const fileNames = await fs.readdir(essaysDir)
  const match = fileNames.find((name) => name.includes(slug))

  if (match) {
    return await getContent(essaysDir, match)
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed")
  }

  const content = await getEntry(req.query.slug)

  if (!content) {
    return res.status(500)
  }

  return res.status(200).json(content)
}
