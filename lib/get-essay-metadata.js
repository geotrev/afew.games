import { promises as fs } from "fs"
import path from "path"
import * as parseMarkdown from "gray-matter"

async function getFrontMatter(essaysDir, fileName) {
  const raw = await fs.readFile(path.resolve(essaysDir, fileName), "utf8")
  const {data} = parseMarkdown(raw)
  return data
}

async function buildEntries() {
  const essaysDir = path.resolve(process.cwd(), "public/essays")
  const fileNames = await fs.readdir(essaysDir)
  return fileNames
    .sort()
    .reverse()
    .map(async (fileName) => {
      const [date, rawName] = fileName.split("--")
      const slug = rawName.slice(0, -3)
      const metadata = await getFrontMatter(essaysDir, fileName)
      return {date, slug, path: `/essays/${slug}`, metadata}
    })
}

const entries = await buildEntries()

/**
 * Return non-content essay metadata:
 * - date
 * - slug
 * - url path
 * - title
 * - description
 */
export async function getEssayData() {  
  return { entries: await Promise.all(entries) }
}
