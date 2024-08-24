"use client"

import { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { ThemeContext } from "app/theme-context"
import cn from "classnames"
import BMCSmallLogo from "./bmc-logo-small.svg"
import GitHubLogo from "@zendeskgarden/svg-icons/src/16/bar-chart-stroke.svg"

export function SocialLinks() {
  const { base } = useContext(ThemeContext)
  return (
    <div className="flex items-center justify-end gap-6">
      <Link
        href="https://github.com/geotrev/afew.games"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the code repository of A Few Games"
      >
        <span
          className={cn({
            "text-white": base === "dark",
            "text-black": base === "light",
          })}
        >
          <GitHubLogo />
        </span>
      </Link>
      <Link
        href="https://buymeacoffee.com/afew.games"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy a coffee for George, the maintainer of A Few Games"
      >
        <span
          className={cn({
            "text-white": base === "dark",
            "text-black": base === "light",
          })}
        >
          <BMCSmallLogo />
        </span>
      </Link>
    </div>
  )
}
