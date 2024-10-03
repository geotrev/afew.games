// @ts-expect-error no types
import MailChimpAPI from "@mailchimp/mailchimp_marketing"
// @ts-expect-error no types
import crypto from "crypto-js"
import { NextResponse } from "next/server"
import xss from "xss"

import {
  EMAIL_REGEXP,
  ERROR_MESSAGE,
  SubscribeFormStatuses,
} from "utils/constants"

function invalidError() {
  return NextResponse.json({
    message: "The value provided wasn't a valid email.",
  })
}

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== "production") console.log("/api/subscribe")

  const res = await req.json()

  if (!res?.email) {
    return invalidError()
  }

  const email = xss(res.email)

  if (!EMAIL_REGEXP.test(res.email)) {
    return invalidError()
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
  } catch (e) {
    return NextResponse.json({
      status: SubscribeFormStatuses.ERROR,
      message: ERROR_MESSAGE,
    })
    // eslint-disable-next-line no-console
    console.error("Error:", e)
  }
}
