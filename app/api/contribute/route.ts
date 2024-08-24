import { Octokit } from "@octokit/core"
import { NextResponse } from "next/server"
import { FIELD_DATA, CONSENT_DATA } from "../../contribute/components/constants"

function getIssueBody(res: Record<string, string>) {
  return (
    `_Submitted via https://afew.games._\n\n` +
    `### ${FIELD_DATA[0].label}\n\n` +
    `${res.title.trim()}\n\n` +
    `### ${FIELD_DATA[1].label}\n\n` +
    `${res.platform.trim()}\n\n` +
    `### ${FIELD_DATA[2].label}\n\n` +
    `${res.mpn.trim() || "No response"}\n\n` +
    `### ${FIELD_DATA[3].label}\n\n` +
    `${res.country.trim() || "No response"}\n\n` +
    `### ${FIELD_DATA[4].label}\n\n` +
    `${res.part.trim() || "No response"}\n\n` +
    `### ${FIELD_DATA[5].label}\n\n` +
    `${res.notes.trim() || "No response"}\n\n` +
    `### ${FIELD_DATA[6].label}\n\n` +
    `${res.credit.trim() || "No response"}\n\n` +
    `### Code of Conduct\n\n` +
    `- [X] ${CONSENT_DATA[0].label} code of conduct\n\n` +
    `### Terms of Use\n\n` +
    `- [X] ${CONSENT_DATA[1].label}`
  )
}

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== "production") console.log("/api/contribute")

  const res = await req.json()

  // Revalidate consent boxes

  if (res.terms !== "on" || res.consent !== "on") {
    return NextResponse.json({
      status: "error",
      message: "Terms of use not accepted",
    })
  }

  // Verify recaptcha

  if (process.env.NODE_ENV === "production") {
    const recaptchaResults = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.APP_CAPTCHA_SECRET}&response=${res.gRecaptchaToken}`,
      {
        method: "POST",
      }
    ).then((res) => res.json())

    if (!recaptchaResults.success) {
      return NextResponse.json({
        status: "error",
        message: "Unable to verify, try again",
      })
    }
  }

  // Submit issue to GH

  const body = getIssueBody(res)

  if (process.env.NODE_ENV === "production") {
    try {
      const octokit = new Octokit({ auth: process.env.APP_GITHUB_ISSUE })

      const response = await octokit.request(
        "POST /repos/geotrev/afew.games/issues",
        {
          title: `[Submission]: ${res.title}`,
          body,
          owner: "geotrev",
          repo: "afew.games",
          labels: ["contribution"],
          projects: ["geotrev/1"],
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      )

      if (response.status === 201) {
        return NextResponse.json({ status: "success" })
      } else {
        return NextResponse.json({
          status: "error",
          message: "Submission error",
        })
      }
    } catch (e) {
      return NextResponse.json({
        status: "error",
        message: "Internal server error",
      })
    }
  } else {
    return NextResponse.json({ status: "success" })
  }
}
