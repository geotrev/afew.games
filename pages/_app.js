import { Helmet } from "react-helmet"
import { useRouter } from "next/router"
import Header from "components/header"
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

export default function App({ Component, pageProps }) {
  const { asPath } = useRouter()
  const title = Titles[asPath]
  const description = Descriptions[asPath]

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
      {renderMeta()}
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
