import Image from "next/image"

export function SocialLinks() {
  return (
    <span className="flex gap-2 pe-2">
      <a
        className="btn btn-success btn-sm block py-0.5"
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
      </a>
    </span>
  )
}
