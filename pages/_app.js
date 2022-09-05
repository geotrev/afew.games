import { Helmet } from "react-helmet"
import { useEffect } from "react"
import Script from "next/script"
import { useRouter } from "next/router"
import { pageView } from "lib/analytics"
import SiteHeader from "components/global/site-header"
import "styles/global.scss"

const BASE_TITLE = "a few games"
const ExactPaths = ["/", "/essays", "/collection"]
const Titles = {
  [ExactPaths[0]]: `home`,
  [ExactPaths[1]]: `essays`,
  [ExactPaths[2]]: `collection`,
}
const Descriptions = {
  [ExactPaths[0]]: "A video game collection website",
  [ExactPaths[1]]: "Essays about video games, software, and work",
  [ExactPaths[2]]: "A collection of rare Wata- and VGA-graded video games",
}

const handleRouteChange = (url) => {
  pageView(url)
}

export default function App({ Component, pageProps }) {
  const { asPath, events } = useRouter()
  const title = Titles[asPath]
  const description = Descriptions[asPath]

  useEffect(() => {
    events.on("routeChangeComplete", handleRouteChange)
    return () => events.off("routeChangeComplete", handleRouteChange)
  }, [events])

  function renderMeta() {
    return (
      <Helmet titleTemplate={`${BASE_TITLE} | %s`} defaultTitle={BASE_TITLE}>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="canonical" href={`http://afew.games${asPath}`} />
        <meta
          name="keywords"
          content="Video Games, Games, Collectibles, Graded Games, Sealed Video Games"
        />
      </Helmet>
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
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
        `}
      </Script>
      {renderMeta()}
      <SiteHeader />
      <Component {...pageProps} />
    </div>
  )
}
