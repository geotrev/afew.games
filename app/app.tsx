import { PropsWithChildren, Suspense } from "react"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"
import { SocialLinks } from "./components/social-links"

export function App({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <div className="m-0 flex w-full flex-col gap-2">
        <SiteHeader />
        <div className="mx-auto flex max-w-screen-md flex-col gap-2 px-4 pb-4">
          <div className="flex flex-row justify-end">
            <SocialLinks />
          </div>
          <main>{children}</main>
          <SiteFooter />
        </div>
      </div>
    </Suspense>
  )
}
