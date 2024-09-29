"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import cn from "classnames"
import Logo from "./afewgames.svg"

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
    <div className="sticky top-0 z-50 w-full bg-base-100">
      <header className="navbar mx-auto w-full max-w-screen-md items-center px-4 py-1">
        <div className="flex-1" itemScope itemType="https://schema.org/Blog">
          <a
            href={Routes.HOME_PATH}
            className="btn btn-ghost h-auto w-16 px-0 py-2 hover:bg-transparent md:w-24"
          >
            <Image alt="A Few Games" src={Logo} width={94} height={76} />
          </a>
        </div>
        <nav className="flex flex-col items-end gap-4">
          <ul className="menu menu-horizontal menu-sm gap-2 rounded-box bg-base-200 sm:menu-md">
            {NavigationItems.map(({ label, isActive, route }) => {
              const active = isActive(pathname)

              return (
                <li key={label}>
                  <Link
                    href={route}
                    aria-current={active ? "true" : undefined}
                    className={cn("font-bold", {
                      "!bg-blue-500 !text-black": active,
                    })}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    </div>
  )
}
