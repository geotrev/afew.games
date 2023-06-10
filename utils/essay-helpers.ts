import path from "path"
import { readdirSync, readFileSync } from "fs"
import matter, { GrayMatterFile } from "gray-matter"
import chunk from "lodash-es/chunk"
import { marked } from "marked"
// @ts-ignore
import { mangle } from "marked-mangle"
import { gfmHeadingId } from "marked-gfm-heading-id"
import { ParsedUrlQuery } from "querystring"
import { EssayProps, Essay, EssayPageData } from "types/essays"

marked.use(mangle())
marked.use(gfmHeadingId())

const MAX_LIST_LENGTH = 5

function getEssaysPath(target: string = ""): string {
  return process.env.NODE_ENV === "development"
    ? path.resolve(process.cwd(), ".seed/essays", target)
    : path.resolve(process.cwd(), "public/essays", target)
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
    const essayData: Essay[] = fileNames.map((fileName: string) => {
      const raw = readFileSync(getEssaysPath(fileName), "utf8")
      const {
        data: { title, description, publish_date },
      }: GrayMatterFile<typeof raw> = matter(raw)
      const rawName = fileName.split("--")[1]
      const slug = rawName.replace(".md", "")
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

    let chunked = chunk(essayData, MAX_LIST_LENGTH)
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

export function getMatchingEssay(
  params: ParsedUrlQuery | undefined
): EssayProps | boolean {
  const slug = params?.slug

  // Redirect to 404
  if (typeof slug !== "string") return false

  const fileNames: string[] = readdirSync(getEssaysPath(), "utf8")
  const fileName: string | undefined = fileNames.find((fileName) => {
    const rawName = fileName.split("--")[1]
    const fileSlug = rawName.replace(".md", "")

    return slug === fileSlug
  })

  // Redirect to 404
  if (!fileName) return false

  const rawFile = readFileSync(getEssaysPath(fileName), "utf8")
  const {
    data: { title, description, publish_date },
    content: markdownContent,
  }: GrayMatterFile<typeof rawFile> = matter(rawFile)
  const content = marked.parse(markdownContent)
  const date = toDateString(publish_date)

  return {
    date,
    title,
    description,
    content,
  }
}
