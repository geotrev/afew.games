import Image from "next/image"
import Link from "next/link"

export function SocialLinks() {
  return (
    <>
      <Link
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
          <Image
            src="/bmc-full-logo.svg"
            alt=""
            role="presentation"
            height={26}
            width={120}
          />
        </picture>
      </Link>
    </>
  )
}
