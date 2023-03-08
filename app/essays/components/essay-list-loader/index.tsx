import { memo, ReactElement } from "react"
import {
  StyledAnimation,
  StyledMetadataAnim,
  StyledTitleAnim,
  StyledDescAnim,
  StyledBgMask,
} from "./styled"

export function EssayListLoaderComponent(): ReactElement<{}> {
  const placeholderIterator = Array(5).fill(null)

  return (
    <section aria-label="Loading essays">
      {placeholderIterator.map((_, idx) => {
        return (
          <StyledAnimation key={idx} aria-hidden="true">
            <StyledMetadataAnim>
              <StyledBgMask />
            </StyledMetadataAnim>
            <StyledTitleAnim>
              <StyledBgMask />
            </StyledTitleAnim>
            <StyledDescAnim>
              <StyledBgMask />
            </StyledDescAnim>
          </StyledAnimation>
        )
      })}
    </section>
  )
}

export const EssayListLoader = memo(EssayListLoaderComponent)
