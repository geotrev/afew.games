import { Octokit } from "@octokit/core"
import { NextResponse } from "next/server"
import matter from "gray-matter"
import rawContributeContent from "@/content/pages/contribute.md"

function getIssueBody(res: Record<string, string>) {
  const { data } = matter(rawContributeContent)

  // Get all fields from the form as defined in blocks
  const formFields = data.blocks.find(
    (block: Record<string, string>) => block._template === "contribute"
  )?.formFields
  const consentFields = data.blocks.find(
    (block: Record<string, string>) => block._template === "contribute"
  )?.consentFields

  // Merge the blocks with user data
  const fieldData = formFields.map((field: Record<string, string>) => {
    return `### ${field.label}\n` + `${res[field.id] || "No response"}\n`
  })
  const consentData = consentFields.map((checkbox: Record<string, string>) => {
    return `- [x] ${checkbox.label}\n`
  })

  return (
    `_Submitted via https://afew.games._\n\n` +
    `${fieldData.join("")}` +
    `\n---\n` +
    `${consentData.join("")}`
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

  // Submit issue to GH in production only

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
      // eslint-disable-next-line no-console
      console.log("Error:", e)
    }
  } else {
    return NextResponse.json({ status: "success" })
  }
}
