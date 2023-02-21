import { NextResponse } from "next/server"
import { getEssayList } from "lib/get-essay-list"
import { EssayPageData } from "types/essays"

export async function POST(
  _: Request,
  { params }: { params: { page: string } }
) {
  // eslint-disable-next-line no-console
  console.log("/api/essay-items", { NODE_ENV: process.env.NODE_ENV })

  if (!params || !params.page) {
    return NextResponse.error()
  }

  try {
    const index = parseInt(params.page, 10)
    if (typeof index === "number") {
      const data: EssayPageData = getEssayList(index) as EssayPageData
      return NextResponse.json(data)
    } else {
      throw new Error(
        "Invalid data type used to fetch pages. Must be type 'number'."
      )
    }
  } catch (e) {
    return NextResponse.error()
  }
}
