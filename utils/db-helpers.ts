import glob from "glob"
import fs from "fs"
import { DatabasePlatform } from "types/games"

const files: string[] = glob.sync("public/collections/games/*.json")

export const getGamesData = () =>
  files.reduce<{ platforms: DatabasePlatform[] }>(
    (mergedData, filePath) => {
      const data = fs.readFileSync(filePath, "utf8")
      const jsonObject: DatabasePlatform = JSON.parse(data)
      mergedData.platforms.push(jsonObject)
      return mergedData
    },
    { platforms: [] }
  )
