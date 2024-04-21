import { transformGameData } from "utils/helpers"
import { getGamesData } from "utils/db-helpers"
import { DatabaseGame, DatabasePlatform } from "types/games"
import xss from "xss"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  console.log("/api/search-games", { NODE_ENV: process.env.NODE_ENV })

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
        // let shouldQuery: boolean = true

        // if (
        //   !noneSelected &&
        //   !allSelected &&
        //   selectedPlatforms.indexOf(games[idx].platform) === -1
        // ) {
        //   shouldQuery = false
        // }

        // if (shouldQuery) {
        queryableGames.forEach((q, gameIdx) => {
          if (!q.includes(searchValue)) return
          filteredEntry.games.push(gameList[gameIdx])
        })
        // }

        if (filteredEntry.games.length <= 0) {
          return acc
        }

        acc.push(filteredEntry)
        return acc
      },
      []
    )

    return NextResponse.json({ status: "success", matches })
  } catch (err) {
    return NextResponse.json({
      status: "error",
      message: "Error with search query. Try again.",
    })
  }
}
