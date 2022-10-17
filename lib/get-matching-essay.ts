import { readdirSync, readFileSync } from "fs"
import matter, { GrayMatterFile } from "gray-matter"
import { marked } from "marked"
import { ParsedUrlQuery } from "querystring"
import { EssayProps } from "types/essays"
import { getEssaysPath } from "./get-essays-path"

export function getMatchingEssay(
  params: ParsedUrlQuery | undefined
): EssayProps | boolean {
  const slug = params?.slug

  // tell getServerSideProps to redirect 404
  if (typeof slug !== "string") return false

  const fileNames: string[] = readdirSync(getEssaysPath(), "utf8")
  const fileName: string | undefined = fileNames.find((fileName) =>
    fileName.includes(slug)
  )

  // tell getServerSideProps to redirect 404
  if (typeof fileName !== "string") {
    return false
  }

  const fileData: string[] = fileName.replace(".md", "").split("--")
  const date: string = fileData[0]

  const rawFile: string = readFileSync(getEssaysPath(fileName), "utf8")
  const {
    data: { title, description },
    content: markdownContent,
  }: GrayMatterFile<typeof rawFile> = matter(rawFile)
  const content: string = marked.parse(markdownContent)

  return {
    title,
    description,
    date,
    content,
  }
}
