const path = require("path")
const { promises: fs } = require("fs")
const vgaList = require("./public/games/vga-games.json")
const wataList = require("./public/games/wata-games.json")

function setGraderType(game, grader) {
  const data = { ...game }
  data.grader = grader

  if (grader === "Wata") {
    data.grade = `${data.boxGrade} ${data.sealGrade}`
    delete data.boxGrade
    delete data.sealGrade
  }

  data.platform = data.console
  delete data.console

  return data
}

async function writeToFile() {
  const fullList = [
    ...vgaList.games.map((game) => setGraderType(game, "VGA")),
    ...wataList.games.map((game) => setGraderType(game, "Wata")),
  ]

  const toPlatformEntries = fullList.reduce((acc, game) => {
    const platform = game.platform
    const entry = acc?.find((p) => p.platform === platform)

    delete game.platform

    if (entry) {
      entry.games.push(game)
    } else {
      acc.push({
        platform: game.platform,
        games: [game],
      })
    }

    return acc
  }, [])

  const sorted = {
    platforms: toPlatformEntries
      .map((p) => p.platform)
      .sort()
      .reduce((acc, platform) => {
        acc.push({ ...toPlatformEntries.find((p) => p.platform === platform) })
        return acc
      }, []),
  }

  await fs.writeFile(
    path.resolve("./public/games/graded-games.json"),
    JSON.stringify(sorted, null, 2),
    "utf8"
  )
}

writeToFile()
