"use client"

import { usePathname } from "next/navigation"
import { ReactElement } from "react"
import {
  StyledLogoContainer,
  StyledHeader,
  StyledLogoLink,
  StyledList,
  StyledNavLink,
  StyledNav,
} from "./styled"
import Logo from "./logo"
import InstagramLogo from "./instagram"

const Routes = {
  DATABASE_PATH: "/database",
  // COLLECTION_PATH: "/collection",
  ESSAYS_PATH: "/essays",
  HOME_PATH: "/",
}

const INSTAGRAM_LABEL = "Instagram"

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
]

const SocialItems = [
  {
    route: "https://www.instagram.com/a.few.games",
    isActive: () => false,
    label: INSTAGRAM_LABEL,
    Component: InstagramLogo,
  },
]

export function SiteHeader(): ReactElement {
  const pathname = usePathname()

  return (
    <StyledHeader>
      <StyledLogoContainer itemScope itemType="https://schema.org/Blog">
        <StyledLogoLink href={Routes.HOME_PATH}>
          <Logo />
        </StyledLogoLink>
        <StyledList style={{ justifyContent: "flex-end" }}>
          {SocialItems.map(({ label, Component, route }) => (
            <li key={label}>
              <a
                style={{ display: "inline-block", maxHeight: "2rem" }}
                href={route}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={label}
              >
                <Component />
              </a>
            </li>
          ))}
        </StyledList>
      </StyledLogoContainer>
      <StyledNav>
        <StyledList>
          {NavigationItems.map(({ label, isActive, route }) => {
            const active = isActive(pathname)

            return (
              <li key={label}>
                <StyledNavLink
                  href={route}
                  aria-current={active ? "true" : undefined}
                  $isActive={active}
                >
                  {label}
                </StyledNavLink>
              </li>
            )
          })}
        </StyledList>
      </StyledNav>
    </StyledHeader>
  )
}
