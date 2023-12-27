import Image from "next/image"
import { SubscribeForm } from "../subscribe-form"
import BMCButtonImage from "./bmc-button.png"

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
      <p className="flex justify-between text-xs">
        <span>&copy; 2022-{new Date().getFullYear()} A Few Games</span>
        <a
          href="https://buymeacoffee.com/afew.games"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buy a coffee for George, the maintainer of A Few Games"
        >
          <Image height={50} src={BMCButtonImage} alt="" role="presentation" />
        </a>
      </p>
    </footer>
  )
}
