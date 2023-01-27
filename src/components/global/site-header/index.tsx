import { NextRouter, useRouter } from "next/router"
import Link from "next/link"
import { ReactElement } from "react"
import cn from "classnames"
import styles from "./styles.module.scss"
import Logo from "./logo"

const Routes = {
  COLLECTION_PATH: "/collection",
  ESSAYS_PATH: "/essays",
  HOME_PATH: "/",
}

export function SiteHeader(): ReactElement {
  const { asPath }: NextRouter = useRouter()
  const isEssaysPath: boolean = asPath.startsWith(Routes.ESSAYS_PATH)
  const isCollectionsPath: boolean = asPath.startsWith(Routes.COLLECTION_PATH)
  const isHomePath: boolean = asPath === Routes.HOME_PATH

  return (
    <header className={styles.pageHeader}>
      <Link href={Routes.HOME_PATH} className={styles.logoContainer}>
        <Logo />
      </Link>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link
              href={Routes.HOME_PATH}
              className={cn(styles.navListItemLink, {
                [styles.isActive]: isHomePath,
              })}
              aria-current={isHomePath ? "true" : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={Routes.ESSAYS_PATH}
              className={cn(styles.navListItemLink, {
                [styles.isActive]: isEssaysPath,
              })}
              aria-current={isEssaysPath ? "true" : undefined}
            >
              Essays
            </Link>
          </li>
          <li>
            <Link
              href={Routes.COLLECTION_PATH}
              className={cn(styles.navListItemLink, {
                [styles.isActive]: isCollectionsPath,
              })}
              aria-current={isCollectionsPath ? "true" : undefined}
            >
              Collection
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
