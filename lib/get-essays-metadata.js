import { promises as fs } from "fs"
import { getEssaysPath } from "./get-essays-path"

export async function getEssaysMetadata() {
  const fileNames = (await fs.readdir(getEssaysPath(),
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
