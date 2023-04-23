import { NextResponse } from "next/server"

import { getEssayList } from "utils/essay-helpers"
import { EssayPageData } from "types/essays"

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  console.log("/api/essays", { NODE_ENV: process.env.NODE_ENV })

  const { searchParams } = new URL(req.url)
  let page = searchParams.get("page")

  if (page) {
    page = String(decodeURIComponent(page as string))
  } else {
    return NextResponse.error()
  }

  try {
    const index = parseInt(page, 10)
    if (typeof index === "number") {
      const data: EssayPageData = getEssayList(index) as EssayPageData
      return NextResponse.json(data)
    } else {
      return NextResponse.error()
    }
  } catch (e) {
    return NextResponse.error()
  }
}
