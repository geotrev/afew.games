"use client"

import { usePathname } from "next/navigation"
import cn from "classnames"
import Logo from "./logo"

const Routes = {
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
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="navbar bg-transparent px-0 pb-8 pt-0">
      <div className="flex-1" itemScope itemType="https://schema.org/Blog">
        <a
          href={Routes.HOME_PATH}
          className="btn-ghost btn h-auto w-16 p-0 hover:bg-transparent md:w-24"
        >
          <Logo />
        </a>
      </div>
      <nav className="flex flex-none">
        <span className="flex gap-2 pe-2">
          <a
            className="btn-accent btn-sm btn block py-0.5"
            href="https://buymeacoffee.com/afew.games"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy a coffee for George, the maintainer of A Few Games"
          >
            <picture>
              <source
                type="image/svg+xml"
                media="(max-width: 600px)"
                width="18px"
                srcSet="/bmc-logo-small.svg 18w"
              />
              <source type="image/svg+xml" srcSet="/bmc-full-logo.svg" />
              <img
                src="/bmc-full-logo.svg"
                alt=""
                role="presentation"
                height="18px"
                width="110px"
              />
            </picture>
          </a>
          <a
            className="btn-ghost btn-sm btn block py-0.5"
            href="https://github.com/geotrev/afew.games"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the code repository of A Few Games"
          >
            <img
              src="/github-mark-white.svg"
              alt=""
              role="presentation"
              height="22px"
              width="22px"
            />
          </a>
        </span>
        <div className="tabs tabs-boxed gap-2">
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
      </nav>
    </header>
  )
}
