import Script from "next/script"
import { PropsWithChildren } from "react"
import { RouteTracker } from "app/components/route-tracker"
import { StyledComponentsRegistry } from "./components/styled-registry"
import "minireset.css"
import { App } from "./app"

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
        <StyledComponentsRegistry>
          <App>{children}</App>
        </StyledComponentsRegistry>

        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
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
