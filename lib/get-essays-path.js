import path from "path"

export function getEssaysPath(target = "") {
  return process.env.NODE_ENV === "development"
    ? path.resolve(process.cwd(), ".seed", "essays", target)
    : path.resolve(process.cwd(), "public", "essays", target)
}
