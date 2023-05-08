export type Essay = {
  date: string
  title: string
  description: string
  urlPath: string
  slug: string
}

export type EssayPageData = {
  index: number
  essays: Essay[]
  totalPages: number
}

export type EssayProps = {
  date: string
  title: string
  description: string
  content: string
}
