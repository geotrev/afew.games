import { useRouter } from "next/router"
import Link from "next/link"
import cn from "classnames"
import styles from "./styles.module.scss"
import Logo from "./logo"

const Routes = {
  COLLECTION_PATH: "/collection",
  ESSAYS_PATH: "/essays",
  HOME_PATH: "/",
}

export function SiteHeader() {
  const { asPath } = useRouter()

  return (
    <header className={styles.pageHeader}>
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
                className={cn(styles.navListItemLink, {
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
                className={cn(styles.navListItemLink, {
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
                className={cn(styles.navListItemLink, {
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
