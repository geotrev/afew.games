import { promises as fs } from "fs"
import path from "path"

export async function getEssayEntries() {
  const fileNames = (await fs.readdir(
    path.resolve(process.cwd(), "public", "essays"),
    "utf8"
  )).sort().reverse()
  
  const essayData = fileNames.map(async (fileName) => {
    const [date, rawName] = fileName.split("--")
    const slug = rawName.slice(0, -3)
    const urlPath = `/essays/${slug}`
    return { urlPath, date, slug, fileName }
  })

  return Promise.all(essayData)
}
