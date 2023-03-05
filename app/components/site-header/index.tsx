"use client"

import { usePathname } from "next/navigation"
import { ReactElement } from "react"
import { StyledHeader, StyledLogoLink, StyledUL, StyledNavLink } from "./styled"
import Logo from "./logo"

const Routes = {
  DATABASE_PATH: "/database",
  COLLECTION_PATH: "/collection",
  ESSAYS_PATH: "/essays",
  HOME_PATH: "/",
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
    route: Routes.DATABASE_PATH,
    isActive: (pathname: string) => pathname.startsWith(Routes.DATABASE_PATH),
    label: "Database",
  },
  {
    route: Routes.COLLECTION_PATH,
    isActive: (pathname: string) => pathname.startsWith(Routes.COLLECTION_PATH),
    label: "Collection",
  },
]

export function SiteHeader(): ReactElement {
  const pathname = usePathname()

  return (
    <StyledHeader>
      <StyledLogoLink href={Routes.HOME_PATH}>
        <Logo />
      </StyledLogoLink>
      <nav>
        <StyledUL>
          {NavigationItems.map((item) => {
            const isActive = item.isActive(pathname)

            return (
              <li key={item.label}>
                <StyledNavLink
                  href={item.route}
                  aria-current={isActive ? "true" : undefined}
                  $isActive={isActive}
                >
                  {item.label}
                </StyledNavLink>
              </li>
            )
          })}
        </StyledUL>
      </nav>
    </StyledHeader>
  )
}
