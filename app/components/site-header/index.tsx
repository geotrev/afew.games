"use client"

import { usePathname } from "next/navigation"
import cn from "classnames"
import Logo from "./logo"
import Image from "next/image"
import BMCLogo from "./bmc-full-logo.svg"

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
        <span className="flex pe-4">
          <a
            className="btn-accent btn-sm btn block py-0.5"
            href="https://buymeacoffee.com/afew.games"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy a coffee for George, the maintainer of A Few Games"
          >
            <Image
              height={24}
              className="inline-block"
              src={BMCLogo}
              alt=""
              role="presentation"
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
