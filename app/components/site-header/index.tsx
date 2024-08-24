"use client"

import { usePathname } from "next/navigation"
import Logo from "./afewgames.svg"
import { SocialLinks } from "../social-links"
import Link from "next/link"

const Routes = {
  HOME_PATH: "/",
  ESSAYS_PATH: "/essays",
  ABOUT_PATH: "/about",
}

const NavigationItems = [
  {
    route: Routes.HOME_PATH,
    isActive: (pathname: string) => pathname === Routes.HOME_PATH,
    label: "Home",
  },
  {
    route: Routes.ESSAYS_PATH,
    isActive: (pathname: string) => pathname.startsWith(Routes.ESSAYS_PATH),
    label: "Essays",
  },
  {
    route: Routes.ABOUT_PATH,
    isActive: (pathname: string) => pathname.startsWith(Routes.ABOUT_PATH),
    label: "About",
  },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="flex items-start bg-transparent px-0 pb-8 pt-0">
      <div className="flex-1" itemScope itemType="https://schema.org/Blog">
        <Link
          href={Routes.HOME_PATH}
          className="h-auto w-16 p-0 hover:bg-transparent md:w-24"
        >
          <Logo />
          <span className="sr-only">Go to home page</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-6 md:flex-row">
        <div className="flex items-center gap-6">
          {NavigationItems.map(({ label, isActive, route }) => {
            const active = isActive(pathname)

            return (
              <Link
                key={label}
                href={route}
                aria-current={active ? "true" : undefined}
              >
                {label}
              </Link>
            )
          })}
        </div>
        <SocialLinks />
      </nav>
    </header>
  )
}
