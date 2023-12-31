import { SubscribeForm } from "../subscribe-form"

export function SiteFooter() {
  return (
    <footer className="my-12">
      <div className="card-bordered card mb-4 w-full rounded-lg border-2 border-secondary">
        <div className="card-body p-4 md:p-8">
          <h2 className="card-title text-secondary">
            Subscribe to A Few Games!
          </h2>
          <p className="mb-4">
            Get occasional emails about game collecting. Unsubscribe at any
            time.
          </p>
          <SubscribeForm />
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-xs">
          <span>&copy; 2022-{new Date().getFullYear()} A Few Games</span>
        </p>
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
            className="btn-ghost btn-sm btn flex items-center py-0.5"
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
      </div>
    </footer>
  )
}
