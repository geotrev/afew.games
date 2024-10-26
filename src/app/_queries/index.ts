import client from "@/tina/__generated__/client"
import {
  EssayFilter,
  Exact,
  InputMaybe,
  Scalars,
} from "@/tina/__generated__/types"
import { Essay } from "@/src/app/types"

// This query is used in both server and client contexts, so it's not
// isolated to src/server like the rest of our Tina queries

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
