import { createGlobalStyle } from "styled-components"
import { html } from "./html"
import { helpers } from "./helpers"

export const GlobalStyle = createGlobalStyle`
  ${html}
  ${helpers}
`
