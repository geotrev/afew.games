import { PageHeading } from "../components/page-heading"
import { BASE_TITLE } from "utils/constants"
import { SubmissionForm } from "./components/submission-form"
import { RecaptchaVerifyWrapper } from "./components/recaptcha-verify-wrapper"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/contribute`,
  },
  title: `${BASE_TITLE} contribute`,
  description: "Contribute to A Few Games' video game database",
}

export default function Page() {
  return (
    <>
      <div className="prose max-w-full">
        <PageHeading>Contribute</PageHeading>
        <p>
          Use this form to submit a new game, new game variant, or both, to be
          added to the variant database.
        </p>
        <p>Looking for the status on a submission?</p>
        <p>
          <a
            className="btn btn-secondary btn-sm mb-4 text-base-100"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/geotrev/afew.games/issues"
          >
            View All Submissions ↗
          </a>
        </p>
      </div>

      <RecaptchaVerifyWrapper>
        <SubmissionForm />
      </RecaptchaVerifyWrapper>
    </>
  )
}
