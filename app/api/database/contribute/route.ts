import { Octokit } from "@octokit/core"
import { NextResponse } from "next/server"

function getIssueBody(res: Record<string, string>) {
  return (
    `### Title\n\n` +
    `${res.title}\n\n` +
    `### Platform\n\n` +
    `${res.platform}\n\n` +
    `### MPN (Manufacturer's Part Number)\n\n` +
    `${res.mpn}\n\n` +
    `### Country\n\n` +
    `${res.country}\n\n` +
    `### Part Code\n\n` +
    `${res.part}\n\n` +
    `### Additional Information\n\n` +
    `${res.notes}\n\n` +
    `### Credit\n\n` +
    `${res.credit}\n\n` +
    `### Code of Conduct\n\n` +
    `- [X] I agree to follow this project's Code of Conduct`
  )
}

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  console.log("/api/database/contribute", { NODE_ENV: process.env.NODE_ENV })

  const res = await req.json()

  // Revalidate consent boxes

  if (res.terms !== "on" || res.consent !== "on") {
    return NextResponse.json({
      status: "error",
      message: "Terms of use not accepted",
    })
  }

  // Verify recaptcha

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

  // Submit issue to GH

  const body = getIssueBody(res)

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
}
