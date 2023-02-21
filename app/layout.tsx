import Script from "next/script"
import { PropsWithChildren } from "react"
import { BASE_TITLE } from "lib/constants"
import { RouteTracker } from "app/components/route-tracker"
import { SiteHeader } from "app/components/site-header"
import { SiteFooter } from "app/components/site-footer"
import "styles/global.scss"

const HOME_TITLE = "home"
const HOME_DESC = "A video game blog & collection website"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>{`${BASE_TITLE} ${HOME_TITLE}`}</title>
        <meta name="description" content={HOME_DESC} />
        <link rel="canonical" href="https://afew.games" />
        <meta
          name="keywords"
          content="Video Games, Games, Collectibles, Graded Games, Sealed Video Games"
        />
      </head>
      <body className="app-container">
        <SiteHeader />
        {children}
        <SiteFooter />

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
