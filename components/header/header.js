// import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Script from "next/script"
import Link from "next/link"
import classNames from "classnames"
import styles from "./styles.module.scss"

const Routes = {
  GAMES_PATH: "/games",
  ESSAYS_PATH: "/essays",
  HOME_PATH: "/",
}

export default function Header() {
  const { asPath } = useRouter()

  return (
    <header className={styles.pageHeader}>
      <Script
        defer
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      />
      <p className={classNames(styles.pageHeading, "text-xs")}>a few games</p>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link passHref href={Routes.HOME_PATH}>
              <a
                className={classNames(styles.navListItemLink, {
                  [styles.isActive]: asPath === Routes.HOME_PATH,
                })}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link passHref href={Routes.ESSAYS_PATH}>
              <a
                className={classNames(styles.navListItemLink, {
                  [styles.isActive]: asPath.startsWith(Routes.ESSAYS_PATH),
                })}
              >
                Essays
              </a>
            </Link>
          </li>
          <li>
            <Link passHref href={Routes.GAMES_PATH}>
              <a
                className={classNames(styles.navListItemLink, {
                  [styles.isActive]: asPath.startsWith(Routes.GAMES_PATH),
                })}
              >
                Games
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
