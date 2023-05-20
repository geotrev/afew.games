import Script from "next/script"
import { PropsWithChildren } from "react"

import { RouteTracker } from "components/route-tracker"
import { App } from "./app"

import "styles/globals.css"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="Video Games, Games, Collectibles, Graded Games, Sealed Video Games"
        />
      </head>
      <body>
        <App>{children}</App>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
            `,
          }}
        ></Script>
        <RouteTracker />
      </body>
    </html>
  )
}
