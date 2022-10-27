import { getEssayList } from "lib/get-essay-list"
import { NextApiRequest, NextApiResponse } from "next"
import { EssayPageData } from "types/essays"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line no-console
  console.log("/api/essays", { NODE_ENV: process.env.NODE_ENV })

  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed")
  }

  try {
    const index = req.body.index
    if (typeof index === "number") {
      const data: EssayPageData = getEssayList(index) as EssayPageData
      return res.status(200).json(data)
    } else {
      throw new Error(
        "Invalid data type used to fetch pages. Must be type 'number'."
      )
    }
  } catch (e) {
    return res.status(500)
  }
}
