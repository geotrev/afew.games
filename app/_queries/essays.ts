import client from "@/tina/__generated__/client"
import {
  EssayFilter,
  Exact,
  InputMaybe,
  Scalars,
} from "@/tina/__generated__/types"
import { Essay } from "@/types/essays"

export interface PaginatedEssay extends Essay {
  cursor?: string
}

export interface PageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string
  endCursor: string
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
): Promise<{ essays?: PaginatedEssay[]; pageInfo?: PageInfo }> {
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
    pageInfo: pages.data?.essayConnection?.pageInfo,
  }
}
