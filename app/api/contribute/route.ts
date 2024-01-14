import { Octokit } from "@octokit/core"
import { NextResponse } from "next/server"

function getIssueBody(res: Record<string, string>) {
  return (
    `_Submitted via https://afew.games._\n\n` +
    `### Title\n\n` +
    `${res.title}\n\n` +
    `### Platform\n\n` +
    `${res.platform}\n\n` +
    `### MPN (Manufacturer's Part Number)\n\n` +
    `${res.mpn || "No response"}\n\n` +
    `### Country\n\n` +
    `${res.country || "No response"}\n\n` +
    `### Product Code\n\n` +
    `${res.part || "No response"}\n\n` +
    `### Additional Information\n\n` +
    `${res.notes || "No response"}\n\n` +
    `### Submitted By\n\n` +
    `${res.credit || "No response"}\n\n` +
    `### Code of Conduct\n\n` +
    `- [X] I agree to follow this project's Code of Conduct\n\n` +
    `### Terms of Use\n\n` +
    `- [X] I understand this form will create a GitHub ticket with the provided information, to remain publicly visible for contributor & collector interest`
  )
}

export async function POST(req: Request) {
  // eslint-disable-next-line no-console
  console.log("/api/contribute", { NODE_ENV: process.env.NODE_ENV })

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
