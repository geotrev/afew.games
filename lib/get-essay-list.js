import { promises as fs } from "fs"
import * as parseMarkdown from "gray-matter"
import chunk from "lodash-es/chunk"
import { getEssaysPath } from "./get-essays-path"

const MAX_LIST_LENGTH = 5

export async function getEssayList(pageIdx) {
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
