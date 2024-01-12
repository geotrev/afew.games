"use client"

import { usePathname } from "next/navigation"
import cn from "classnames"
import Logo from "./logo"
import { SocialLinks } from "../social-links"

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
    <header className="navbar items-start bg-transparent px-0 pb-8 pt-0">
      <div className="flex-1" itemScope itemType="https://schema.org/Blog">
        <a
          href={Routes.HOME_PATH}
          className="btn btn-ghost h-auto w-16 p-0 hover:bg-transparent md:w-24"
        >
          <Logo />
        </a>
      </div>
      <nav className="flex flex-col items-end gap-2">
        <div className="tabs-boxed tabs gap-2">
          {NavigationItems.map(({ label, isActive, route }) => {
            const active = isActive(pathname)

            return (
              <a
                key={label}
                href={route}
                aria-current={active ? "true" : undefined}
                className={cn("tab font-bold", {
                  "tab-active": active,
                  "text-neutral-content": !active,
                })}
              >
                {label}
              </a>
            )
          })}
        </div>
        <SocialLinks />
      </nav>
    </header>
  )
}
