import { createGlobalStyle } from "styled-components"
import { reset } from "./reset"
import { html } from "./html"
import { helpers } from "./helpers"

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${html}
  ${helpers}
`
