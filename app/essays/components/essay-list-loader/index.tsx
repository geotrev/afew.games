import { memo, ReactElement } from "react"

export function EssayListLoaderComponent(): ReactElement<HTMLElement> {
  const placeholderIterator = Array(5).fill(null)

  return (
    <section aria-label="Loading essays">
      {placeholderIterator.map((_, idx) => {
        return (
          <div
            key={idx}
            className="my-12 flex animate-pulse flex-col gap-4"
            aria-hidden="true"
          >
            <div className="opacity-20 h-4 w-40 rounded bg-grey-900"></div>
            <div className="opacity-20 h-6 w-full rounded bg-grey-900"></div>
            <div className="grid grid-cols-4 gap-4">
              <div className="opacity-20 col-span-3 h-4 rounded bg-grey-900"></div>
              <div className="opacity-20 col-span-1 h-4 rounded bg-grey-900"></div>
              <div className="opacity-20 col-span-1 h-4 rounded bg-grey-900"></div>
              <div className="opacity-20 col-span-3 h-4 rounded bg-grey-900"></div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export const EssayListLoader = memo(EssayListLoaderComponent)
