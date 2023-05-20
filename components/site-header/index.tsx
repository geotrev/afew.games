"use client"

import { usePathname } from "next/navigation"
// import { useState, useCallback, useEffect } from "react"
import cn from "classnames"
import Logo from "./logo"

const Routes = {
  DATABASE_PATH: "/database",
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
]

// const DarkIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="h-6 w-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
//     />
//   </svg>
// )

// const LightIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="h-6 w-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//     />
//   </svg>
// )

// const ThemeIcons: Record<string, () => JSX.Element> = {
//   few: DarkIcon,
//   winter: LightIcon,
// }

export function SiteHeader() {
  const pathname = usePathname()
  // const [activeTheme, setActiveTheme] = useState("few")
  // const ActiveThemeComponent = ThemeIcons[activeTheme]

  // useEffect(() => {
  //   if (document?.documentElement && activeTheme) {
  //     const doc = document.documentElement

  //     if (
  //       localStorage.theme === "winter" ||
  //       ("theme" in localStorage &&
  //         !window.matchMedia("(prefers-color-scheme: dark)").matches)
  //     ) {
  //       doc.dataset.theme = "winter"
  //     } else {
  //       doc.dataset.theme = "few"
  //     }
  //   }
  // }, [activeTheme])

  // const handleDarkThemeClick = useCallback(() => {
  //   if (activeTheme !== "few") {
  //     localStorage.theme = "few"
  //     setActiveTheme("few")
  //   }
  // }, [activeTheme])

  // const handleLightThemeClick = useCallback(() => {
  //   if (activeTheme !== "winter") {
  //     localStorage.theme = "winter"
  //     setActiveTheme("winter")
  //   }
  // }, [activeTheme])

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
        {/* <div className="dropdown-end dropdown">
          <button type="button" className="btn-ghost btn-square rounded-btn btn-sm btn">
            <ActiveThemeComponent />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-4 w-52 bg-base-300 p-2 shadow"
          >
            <li>
              <button
                type="button"
                className="text-bold normal-case"
                onClick={handleDarkThemeClick}
              >
                <DarkIcon /> Dark
              </button>
            </li>
            <li>
              <button
                type="button"
                className="text-bold normal-case"
                onClick={handleLightThemeClick}
              >
                <LightIcon /> Light
              </button>
            </li>
          </ul>
        </div> */}
      </nav>
    </header>
  )
}
