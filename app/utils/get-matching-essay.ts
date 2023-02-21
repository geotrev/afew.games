import { readdirSync, readFileSync } from "fs"
import matter, { GrayMatterFile } from "gray-matter"
import { marked } from "marked"
import { ParsedUrlQuery } from "querystring"
import { EssayProps } from "app/types/essays"
import { getEssaysPath } from "./get-essays-path"

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
