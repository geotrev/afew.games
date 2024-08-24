import { BASE_TITLE } from "utils/constants"
import { SubmissionForm } from "./components/submission-form"
import { RecaptchaVerifyWrapper } from "./components/recaptcha-verify-wrapper"
import { Content } from "./components/content"

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
      <Content />
      <RecaptchaVerifyWrapper>
        <SubmissionForm />
      </RecaptchaVerifyWrapper>
    </>
  )
}
