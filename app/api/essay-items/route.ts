import { NextResponse } from "next/server"
import { NextURL } from "next/dist/server/web/next-url"
import { getEssayList } from "utils/essay-helpers"
import { EssayPageData } from "app/types/essays"

export async function POST(req: Request & { nextUrl: NextURL }) {
  // eslint-disable-next-line no-console
  console.log("/api/essay-items", { NODE_ENV: process.env.NODE_ENV })

  let page = req?.nextUrl?.searchParams.get("page")

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
