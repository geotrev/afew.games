import { PropsWithChildren, Suspense } from "react"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"

export function App({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <div className="mx-auto mb-0 max-w-screen-md p-4 pt-8">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </Suspense>
  )
}
