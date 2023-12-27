import { PageHeading } from "components"
import { BASE_TITLE } from "utils/constants"
import { SubmissionForm } from "./components/submission-form"
import { RecaptchaVerifyWrapper } from "./components/recaptcha-verify-wrapper"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/database/contribute`,
  },
  title: `${BASE_TITLE} database | contribute`,
  description: "Contribute to A Few Games' video game database",
}

export default function Page() {
  return (
    <>
      <div className="prose max-w-full">
        <PageHeading>Database/Contribute</PageHeading>
        <p>
          Use this form to submit a new game, new game variant, or both, to be
          added to the variant database.
        </p>
        <p>Looking for the status on a submission?</p>
        <p>
          <a
            className="btn-secondary btn-sm btn mb-4 text-base-100"
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
