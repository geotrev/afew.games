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
  const isEssaysPath = asPath.startsWith(Routes.ESSAYS_PATH)
  const isCollectionsPath = asPath.startsWith(Routes.COLLECTION_PATH)
  const isHomePath = asPath === Routes.HOME_PATH

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
                  [styles.isActive]: isHomePath,
                })}
                aria-current={isHomePath ? "true" : null}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link passHref href={Routes.ESSAYS_PATH}>
              <a
                className={cn(styles.navListItemLink, {
                  [styles.isActive]: isEssaysPath,
                })}
                aria-current={isEssaysPath ? "true" : null}
              >
                Essays
              </a>
            </Link>
          </li>
          <li>
            <Link passHref href={Routes.COLLECTION_PATH}>
              <a
                className={cn(styles.navListItemLink, {
                  [styles.isActive]: isCollectionsPath,
                })}
                aria-current={isCollectionsPath ? "true" : null}
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
