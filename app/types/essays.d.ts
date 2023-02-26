export type Essay = {
  title: string
  description: string
  metadata: {
    urlPath: string
    date: string
    slug: string
  }
}

export type EssayPageData = {
  index: number
  essays: Essay[]
  totalPages: number
}

export type EssayProps = {
  title: string
  description: string
  date: string
  content: string
}
