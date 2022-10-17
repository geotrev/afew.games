import { ReactElement } from "react"

export function EssayListError(): ReactElement {
  return (
    <div>
      <p>
        {"Uh oh, looks like there was an error. Refresh or try again later."}
      </p>
    </div>
  )
}
