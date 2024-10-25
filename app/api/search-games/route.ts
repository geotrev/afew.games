import { transformGameData } from "@/app/_utils/helpers"
import { getGamesData } from "@/app/_utils/server-helpers"
import { DatabaseGame, DatabasePlatform } from "types/games"
import xss from "xss"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== "production") console.log("/api/search-games")

  const res = await req.json()
  const searchValue = xss(res.value)?.toLowerCase()
  let matches: DatabasePlatform[] = []

  try {
    const mergedDatabase = getGamesData()
    const { games, queryData } = transformGameData(mergedDatabase)

    matches = queryData.reduce<DatabasePlatform[]>(
      (acc, queryableGames: string[], idx) => {
        const gameList: DatabaseGame[] = games[idx].games
        const filteredEntry: DatabasePlatform = {
          platform: games[idx].platform,
          games: [],
        }

        queryableGames.forEach((q, gameIdx) => {
          if (!q.includes(searchValue)) return
          filteredEntry.games.push(gameList[gameIdx])
        })

        if (filteredEntry.games.length <= 0) {
          return acc
        }

        acc.push(filteredEntry)
        return acc
      },
      []
    )

    return NextResponse.json({ status: "success", matches })
  } catch (e) {
    return NextResponse.json({
      status: "error",
      message: "Error with search query. Try again.",
    })
    // eslint-disable-next-line no-console
    console.error("Error:", e)
  }
}
