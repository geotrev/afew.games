import Header from "components/header"
import "styles/global.scss"

export default function App({ Component, pageProps }) {
  return (
    <div className="app-container">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
