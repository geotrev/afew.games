import path from "path"
import { readdirSync, readFileSync } from "fs"
import matter, { GrayMatterFile } from "gray-matter"
import chunk from "lodash-es/chunk"
import { marked } from "marked"
import { ParsedUrlQuery } from "querystring"
import { EssayProps, Essay, EssayPageData } from "app/types/essays"

const MAX_LIST_LENGTH = 5

function getEssaysPath(target: string = ""): string {
  return process.env.NODE_ENV === "development"
    ? path.resolve(process.cwd(), ".seed", "essays", target)
    : path.resolve(process.cwd(), "public", "essays", target)
}

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
  const fileName: string | undefined = fileNames.find((fileName) =>
    fileName.includes(slug)
  )

  // Redirect to 404
  if (typeof fileName !== "string") return false

  const fileData: string[] = fileName.replace(".md", "").split("--")
  const date = fileData[0]

  const rawFile = readFileSync(getEssaysPath(fileName), "utf8")
  const {
    data: { title, description },
    content: markdownContent,
  }: GrayMatterFile<typeof rawFile> = matter(rawFile)
  const content = marked.parse(markdownContent)

  return {
    title,
    description,
    date,
    content,
  }
}
