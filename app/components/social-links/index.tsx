import Image from "next/image"
import Link from "next/link"

export function SocialLinks() {
  return (
    <span className="flex gap-2">
      <Link
        className="btn btn-ghost btn-sm flex items-center py-0.5"
        href="https://github.com/geotrev/afew.games"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View the code repository of A Few Games"
      >
        <Image
          src="/github-mark-white.svg"
          alt=""
          role="presentation"
          height={22}
          width={22}
        />
      </Link>
      <Link
        className="btn btn-success btn-sm block py-0.5"
        href="https://buymeacoffee.com/afew.games"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy a coffee for George, the maintainer of A Few Games"
      >
        <Image
          src="/bmc-full-logo.svg"
          alt=""
          role="presentation"
          height={26}
          width={120}
        />
      </Link>
    </span>
  )
}
