import { promises as fs } from "fs"
import path from "path"
import * as parseMarkdown from "gray-matter"

async function getEntries() {
  const fileNames = await fs.readdir(
    path.resolve(process.cwd(), "public", "essays"),
    "utf8"
  )
  const essayData = fileNames.map(async (fileName) => {
    const raw = await fs.readFile(
      path.resolve(process.cwd(), "public", "essays", fileName),
      "utf8"
    )
    const { data } = parseMarkdown(raw)
    const [date, rawName] = fileName.split("--")
    const slug = rawName.slice(0, -3)
    return { ...data, metadata: { date, slug } }
  })
  // const content = marked.parse(markdownContent)
  return essayData
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end("Method Not Allowed")
  }

  const entries = await getEntries()
  if (!entries) {
    return res.status(500)
  }

  return res.status(200).json({ entries })
}
