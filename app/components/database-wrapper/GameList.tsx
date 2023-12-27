import { DatabaseList } from "../database-list"
import { DatabasePlatform } from "types/games"

function getGamesByCount(
  count: number,
  games: DatabasePlatform[]
): DatabasePlatform[] {
  let inc = count
  let retVal = []

  for (const p of games) {
    if (inc <= 0) break

    if (p.games.length <= inc) {
      retVal.push(p)
      inc -= p.games.length
    } else {
      const pushedVal = p.games.slice(0, inc)
      retVal.push({
        platform: p.platform,
        games: pushedVal,
      })
      inc -= pushedVal.length
    }
  }

  return retVal
}

export function GameList({
  count,
  games: _games,
}: {
  count: number | null
  games: DatabasePlatform[]
}) {
  const games = count === null ? _games : getGamesByCount(count, _games)

  return games.map((p: DatabasePlatform) => (
    <DatabaseList
      key={p.platform}
      games={p.games}
      label={p.platform}
      id={p.platform.split(" ").join("-")}
    />
  ))
}
