import { NextResponse } from "next/server"

import { getEssayList } from "utils/essay-helpers"
import { EssayPageData } from "types/essays"

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  console.log("/api/database/contribute", { NODE_ENV: process.env.NODE_ENV })

  const res = await req.json()

  if (typeof res?.page !== "number") {
    return NextResponse.error()
  }

  try {
    const index = parseInt(res.page, 10)

    if (typeof index === "number") {
      const data: EssayPageData = await getEssayList(index)

      return NextResponse.json(data)
    } else {
      return NextResponse.error()
    }
  } catch (e) {
    return NextResponse.error()
  }
}
