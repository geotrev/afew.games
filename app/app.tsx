import { PropsWithChildren } from "react"
import { SiteHeader } from "app/components/site-header"
import { SiteFooter } from "app/components/site-footer"
import styles from "./app.module.scss"

export function App({ children }: PropsWithChildren) {
  return (
    <div className={styles.app}>
      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  )
}
