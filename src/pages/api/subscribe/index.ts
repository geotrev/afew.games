// @ts-ignore-next-line
import client from "@mailchimp/mailchimp_marketing"
// @ts-ignore-next-line
import crypto from "crypto-js"
import { NextApiRequest, NextApiResponse } from "next"
import {
  EMAIL_REGEXP,
  ERROR_MESSAGE,
  SubscribeFormStatuses,
} from "lib/constants"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line no-console
  console.log("/api/subscribe", { NODE_ENV: process.env.NODE_ENV })

  if (req.method !== "POST") {
    return res.status(405).json({
      status: SubscribeFormStatuses.ERROR,
      message: "Invalid HTTP method.",
    })
  }

  const { email } = req.body

  if (typeof email !== "string" || !EMAIL_REGEXP.test(email)) {
    return res
      .status(500)
      .json({ message: "The value provided wasn't a valid email." })
  }

  try {
    const LIST_ID = process.env.APP_MAILCHIMP_LIST_ID
    const API_KEY = process.env.APP_MAILCHIMP_API_KEY
    const SERVER = process.env.APP_MAILCHIMP_SERVER

    client.setConfig({
      apiKey: API_KEY,
      server: SERVER,
    })

    const response = await client.lists.setListMember(
      LIST_ID,
      crypto.MD5(email.toLowerCase()).toString(),
      {
        email_address: email,
        status_if_new: "subscribed",
      }
    )

    if (response.status >= 400) {
      return res
        .status(400)
        .json({ status: SubscribeFormStatuses.ERROR, message: ERROR_MESSAGE })
    }

    return res.status(201).json({
      status: SubscribeFormStatuses.SUCCESS,
      message: "You're subscribed!",
    })
  } catch (e: any) {
    return res
      .status(500)
      .json({ status: SubscribeFormStatuses.ERROR, message: ERROR_MESSAGE })
  }
}
