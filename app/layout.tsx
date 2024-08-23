import Script from "next/script"
import { PropsWithChildren } from "react"

import { RouteTracker } from "./components/route-tracker"
import { App } from "./app"

import "styles/globals.css"
import StyledComponentsRegistry from "./StyledComponentsRegistry"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="bg-grey-1100">
      <head>
        <meta
          name="keywords"
          content="Video Games, Games, Collectibles, Graded Games, Sealed Video Games"
        />
      </head>
      <body className="text-grey-200">
        <StyledComponentsRegistry>
          <App>{children}</App>
        </StyledComponentsRegistry>

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
