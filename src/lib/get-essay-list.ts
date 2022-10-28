import { readdirSync, readFileSync } from "fs"
import matter, { GrayMatterFile } from "gray-matter"
import chunk from "lodash-es/chunk"
import { Essay, EssayPageData } from "src/types/essays"
import { getEssaysPath } from "./get-essays-path"

const MAX_LIST_LENGTH = 5

export function getEssayList(index: number): EssayPageData {
  const fileNames: string[] = readdirSync(getEssaysPath(), "utf8")
    .sort()
    .reverse()

  try {
    const essayData: Essay[] = fileNames.map((fileName: string) => {
      const raw = readFileSync(getEssaysPath(fileName), "utf8")
      const {
        data: { title, description },
      }: GrayMatterFile<typeof raw> = matter(raw)
      const [date, rawName] = fileName.split("--")
      const slug = rawName.slice(0, -3)
      const urlPath = `/essays/${slug}`
      return { title, description, metadata: { urlPath, date, slug } }
    })

    const chunked = chunk(essayData, MAX_LIST_LENGTH)
    const totalPages: number = chunked.length
    return { index, essays: chunked[index], totalPages }
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return { index: -1, essays: [], totalPages: 0 }
  }
}
