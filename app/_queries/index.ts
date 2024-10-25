import client from "@/tina/__generated__/client"
import {
  EssayFilter,
  Exact,
  InputMaybe,
  Scalars,
} from "@/tina/__generated__/types"
import { Essay } from "@/types/essays"

// home query

export const queryHome = async () => {
  return client.queries.content({ relativePath: "home.md" })
}

// about query

export const queryAbout = async () => {
  return client.queries.content({ relativePath: "about.md" })
}

// contribute query

export const queryContribute = async () => {
  return client.queries.content({ relativePath: "contribute.md" })
}

// contributors query

export const queryContributors = async () => {
  const contribQuery = await client.queries.db_contributors({
    relativePath: "contributors.json",
  })
  return contribQuery?.data?.db_contributors?.contributors
}

// essays query

export interface PaginatedEssay extends Essay {
  cursor?: string
}

export async function queryEssays(
  options: Exact<{
    before?: InputMaybe<Scalars["String"]["input"]>
    after?: InputMaybe<Scalars["String"]["input"]>
    first?: InputMaybe<Scalars["Float"]["input"]>
    last?: InputMaybe<Scalars["Float"]["input"]>
    sort?: InputMaybe<Scalars["String"]["input"]>
    filter?: InputMaybe<EssayFilter>
  }>
): Promise<{ essays?: PaginatedEssay[] }> {
  const pages = await client.queries.essayConnection({ ...options })

  // Shape the essay data into a format the UI expects
  // Cursor must be included for pagination
  return {
    essays: pages.data?.essayConnection?.edges?.map((edge) => {
      return {
        cursor: edge?.cursor,
        slug: edge?.node?._sys.filename,
        urlPath: `/essays/${edge?.node?._sys.filename}`,
        date: edge?.node?.publish_date,
        title: edge?.node?.title,
        description: edge?.node?.description,
      }
    }),
  }
}

// essay query

export const queryEssay = async (slug: string) => {
  return client.queries.essay({ relativePath: `${slug}.md` })
}
