import "server-only"
import client from "@/tina/__generated__/client"
import glob from "glob"
import fs from "fs"
import { DatabasePlatform } from "@/src/app/types"

// Game data queries
// These are not through Tina, but still on the server

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

export const getPlatformList = () =>
  files.reduce<string[]>((platforms, filePath) => {
    const gameJson = fs.readFileSync(filePath, "utf8")
    const data: DatabasePlatform = JSON.parse(gameJson)
    platforms.push(data.platform)
    return platforms
  }, [])

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

// essay query

export const queryEssay = async (slug: string) => {
  return client.queries.essay({ relativePath: `${slug}.md` })
}
