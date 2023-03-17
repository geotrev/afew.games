"use client"

import { ReactElement } from "react"
import { StyledEssayFooter } from "./styled"

export function EssayFooter(): ReactElement {
  return (
    <>
      <StyledEssayFooter>
        <em>
          Have questions or want to fact check me? Feel free to email me at{" "}
          <a href="mailto:contact@afew.games">contact@afew.games</a>.
        </em>
      </StyledEssayFooter>
      <StyledEssayFooter>
        <em>
          <strong>{"George W."}</strong>{" "}
          {
            "is a web developer by day and avid game collector by night. He considers himself an amateur blogger and isn't sure why he's writing in the third person."
          }
        </em>
      </StyledEssayFooter>
    </>
  )
}
