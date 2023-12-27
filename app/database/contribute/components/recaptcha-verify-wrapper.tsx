"use client"

import { ReactNode } from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export function RecaptchaVerifyWrapper({ children }: { children: ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_ID as string}
      scriptProps={{ async: true, defer: true }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
