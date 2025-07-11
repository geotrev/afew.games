import { SocialLinks } from "../social-links"
import { SubscribeForm } from "../subscribe-form"

export function SiteFooter() {
  return (
    <footer className="my-12">
      <div className="card card-bordered mb-4 w-full rounded-lg border-2 border-accent">
        <div className="card-body p-4 md:p-8">
          <h2 className="card-title text-primary">Subscribe to A Few Games!</h2>
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
          &nbsp;&bull;&nbsp;
          <span>Designed &amp; developed by <a href="https://rightwarp.com" className="link">Right Warp, LLC</a></span>
        </p>
        <SocialLinks />
      </div>
    </footer>
  )
}
