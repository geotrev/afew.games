import { getEssayList } from "lib/get-essay-list"

export default async function handler(req, res) {
  // eslint-disable-next-line no-console
  console.log("/api/essays", { NODE_ENV: process.env.NODE_ENV })

  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed")
  }

  try {
    if (typeof req.body.pageIdx === "number") {
      const data = await getEssayList(req.body.pageIdx)
      return res.status(200).json(data)
    } else {
      throw new Error(
        "Invalid data type given to 'page'. Must be type 'string'."
      )
    }
  } catch (e) {
    return res.status(500)
  }
}
