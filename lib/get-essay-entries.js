import { promises as fs } from "fs"
import path from "path"
import * as parseMarkdown from "gray-matter"

export async function getEssayEntries() {
  const fileNames = (await fs.readdir(
    path.resolve(process.cwd(), "public", "essays"),
    "utf8"
  )).sort().reverse()
  
  const essayData = fileNames.map(async (fileName) => {
    const raw = await fs.readFile(
      path.resolve(process.cwd(), "public", "essays", fileName),
      "utf8"
    )
    const { data } = parseMarkdown(raw)
    const [date, rawName] = fileName.split("--")
    const slug = rawName.slice(0, -3)
    const urlPath = `/essays/${slug}`
    return { ...data, metadata: { urlPath, date, slug, fileName } }
  })

  return Promise.all(essayData)
}
