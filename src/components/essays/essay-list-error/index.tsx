import { ReactElement, memo } from "react"

function EssayListErrorComponent(): ReactElement {
  return (
    <div>
      <p>
        {"Uh oh, looks like there was an error. Refresh or try again later."}
      </p>
    </div>
  )
}

export const EssayListError = memo(EssayListErrorComponent)
