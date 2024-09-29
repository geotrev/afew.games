import path from "path"
import { readdirSync, readFileSync } from "fs"
import matter, { GrayMatterFile } from "gray-matter"
import chunk from "lodash-es/chunk"
import { marked } from "marked"
import { mangle } from "marked-mangle"
import { gfmHeadingId } from "marked-gfm-heading-id"
import { Essay, EssayPageData } from "types/essays"

marked.use(mangle())
marked.use(gfmHeadingId())

const MAX_LIST_LENGTH = 5

function getEssaysPath(target: string = ""): string {
  return path.resolve(process.cwd(), "essays", target)
}

function toDateString(date: Date | string): string {
  return date instanceof Date
    ? date.toLocaleDateString().split("/").join("-")
    : date
}

export function getEssayList(index: number): EssayPageData {
  const fileNames: string[] = readdirSync(getEssaysPath(), "utf8")
    .sort()
    .reverse()

  try {
    const essayData: Essay[] = fileNames
      .map((fileName: string) => {
        const raw = readFileSync(getEssaysPath(fileName), "utf8")
        const {
          data: { title, description, publish_date },
        }: GrayMatterFile<typeof raw> = matter(raw)
        const slug = fileName.replace(".md", "")
        const urlPath = `/essays/${slug}`
        const date = toDateString(publish_date)

        return {
          date,
          title,
          description,
          urlPath,
          slug,
        }
      })
      // Sort the entries by date
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const chunked = chunk(essayData, MAX_LIST_LENGTH)
    const totalPages: number = chunked.length
    return {
      index: totalPages - 1 < index ? 0 : index,
      essays: totalPages - 1 < index ? chunked[0] : chunked[index],
      totalPages,
    }
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return { index: -1, essays: [], totalPages: 0 }
  }
}
