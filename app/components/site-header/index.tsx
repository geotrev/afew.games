"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming"
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
    <ThemeProvider
      theme={{
        ...DEFAULT_THEME,
        colors: { ...DEFAULT_THEME.colors, base: "dark" },
      }}
    >
      <header className="flex items-start bg-transparent px-0 pb-8 pt-0">
        <div className="flex-1" itemScope itemType="https://schema.org/Blog">
          <Link
            href={Routes.HOME_PATH}
            className="h-auto w-16 p-0 hover:bg-transparent md:w-24"
          >
            <Image alt="A Few Games" src={Logo} width={94} height={76} />
          </Link>
        </div>
        <nav className="flex flex-row items-center gap-4">
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
          <SocialLinks />
        </nav>
      </header>
    </ThemeProvider>
  )
}
