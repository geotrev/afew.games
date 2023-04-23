// @ts-ignore-next-line
import MailChimpAPI from "@mailchimp/mailchimp_marketing"
// @ts-ignore-next-line
import crypto from "crypto-js"
import { NextResponse } from "next/server"

import {
  EMAIL_REGEXP,
  ERROR_MESSAGE,
  SubscribeFormStatuses,
} from "utils/constants"

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  console.log("/api/subscribe", { NODE_ENV: process.env.NODE_ENV })

  const { searchParams } = new URL(req.url)
  let email = searchParams.get("email")

  if (email) {
    email = String(decodeURIComponent(email as string))
  }

  if (!email || !EMAIL_REGEXP.test(email)) {
    return NextResponse.json({
      message: "The value provided wasn't a valid email.",
    })
  }

  try {
    const LIST_ID = process.env.APP_MAILCHIMP_LIST_ID
    const API_KEY = process.env.APP_MAILCHIMP_API_KEY
    const SERVER = process.env.APP_MAILCHIMP_SERVER

    MailChimpAPI.setConfig({
      apiKey: API_KEY,
      server: SERVER,
    })

    const response = await MailChimpAPI.lists.setListMember(
      LIST_ID,
      crypto.MD5(email.toLowerCase()).toString(),
      {
        email_address: email,
        status_if_new: "subscribed",
      }
    )

    if (response.status >= 400 && response.status < 500) {
      return NextResponse.json({
        status: SubscribeFormStatuses.ERROR,
        message: ERROR_MESSAGE,
      })
    }

    return NextResponse.json({
      status: SubscribeFormStatuses.SUCCESS,
      message: "You're subscribed!",
    })
  } catch (e: any) {
    return NextResponse.json({
      status: SubscribeFormStatuses.ERROR,
      message: ERROR_MESSAGE,
    })
  }
}
