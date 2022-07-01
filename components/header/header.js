import { useRouter } from "next/router"
import Script from "next/script"
import Link from "next/link"
import classNames from "classnames"
import styles from "./styles.module.scss"
import Logo from "./logo"

const Routes = {
  COLLECTION_PATH: "/collection",
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
      <Link passHref href={Routes.HOME_PATH}>
        <a className={styles.logoContainer}>
          <Logo />
        </a>
      </Link>
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
            <Link passHref href={Routes.COLLECTION_PATH}>
              <a
                className={classNames(styles.navListItemLink, {
                  [styles.isActive]: asPath.startsWith(Routes.COLLECTION_PATH),
                })}
              >
                Collection
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
