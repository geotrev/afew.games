import { PropsWithChildren } from "react"
import { SiteHeader, SiteFooter } from "components"

export function App({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto mb-0 mt-4 max-w-screen-md p-4">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
