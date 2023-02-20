import { useEffect } from "react"
import { AppProps } from "next/app"
import Script from "next/script"
import Head from "next/head"
import { useRouter } from "next/router"
import { pageView } from "lib/page-view"
import { BASE_TITLE } from "lib/constants"
import { SiteHeader } from "components/global"
import { SiteFooter } from "components/global/site-footer"
import "styles/global.scss"

const ExactPaths = ["/", "/essays", "/collection"]
const Titles = {
  [ExactPaths[0]]: `home`,
  [ExactPaths[1]]: `essays`,
  [ExactPaths[2]]: `collection`,
}
const Descriptions = {
  [ExactPaths[0]]: "A video game blog & collection website",
  [ExactPaths[1]]: "Essays about video games, collecting, and nonsense",
  [ExactPaths[2]]: "A collection of rare Wata- and VGA-graded video games",
}

const handleRouteChange = (url: string) => {
  pageView(url)
}

export default function App({ Component, pageProps }: AppProps) {
  const { asPath, events } = useRouter()
  const title = Titles[asPath]
  const description = Descriptions[asPath]

  useEffect(() => {
    events.on("routeChangeComplete", handleRouteChange)
    return () => events.off("routeChangeComplete", handleRouteChange)
  }, [events])

  function renderMeta() {
    return (
      <Head>
        {title && <title>{`${BASE_TITLE} ${title}`}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="canonical" href={`https://afew.games${asPath}`} />
        <meta
          name="keywords"
          content="Video Games, Games, Collectibles, Graded Games, Sealed Video Games"
        />
      </Head>
    )
  }

  return (
    <div className="app-container">
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
      {renderMeta()}
      <SiteHeader />
      <Component {...pageProps} />
      <SiteFooter />
    </div>
  )
}
