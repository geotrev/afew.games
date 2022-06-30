import { promises as fs } from "fs"
import * as parseMarkdown from "gray-matter"
import { marked } from "marked"
import { getEssaysPath } from "./get-essays-path"

export async function getMatchingEssay({ slug }) {
  const fileNames = await fs.readdir(getEssaysPath(), "utf8")
  const fileName = fileNames.find((fileName) => fileName.includes(slug))

  // tell getServerSideProps to redirect 404
  if (!fileName) {
    return false
  }

  const fileData = fileName.replace(".md", "").split("--")
  const date = fileData[0]

  const rawFile = await fs.readFile(getEssaysPath(fileName), "utf8")
  const {
    data: { title, description },
    content: markdownContent,
  } = parseMarkdown(rawFile)
  const content = marked.parse(markdownContent)

  return {
    title,
    description,
    date,
    content,
  }
}
