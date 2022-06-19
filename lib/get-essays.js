import { promises as fs } from "fs"
import path from "path"
import * as parseMarkdown from "gray-matter"
import {marked} from "marked"
// import purify from "dompurify"

async function getPageContent(essaysDir, fileName) {
  const raw = await fs.readFile(path.resolve(essaysDir, fileName), "utf8")
  const parsed = parseMarkdown(raw)
  const content = marked.parse(parsed.content)
  return {metadata: parsed.data, content}
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
      const article = await getPageContent(essaysDir, fileName)
      return {date, slug, path: `/essays/${slug}`, article}
    })
}

const entries = await buildEntries()

export async function getEssayData() {  
  return { entries: await Promise.all(entries) }
}
