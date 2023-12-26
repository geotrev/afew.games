import { PageHeading } from "components"
import { BASE_TITLE } from "utils/constants"
import { SubmissionForm } from "./components/submission-form"
import Script from "next/script"

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
        <PageHeading>Contribute</PageHeading>
        <p>Use this form to submit a new game, new game variant, or both!</p>
      </div>

      <SubmissionForm />

      <Script src="https://www.google.com/recaptcha/api.js" />
    </>
  )
}
