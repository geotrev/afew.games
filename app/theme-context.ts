import { createContext, Dispatch, SetStateAction } from "react"

export const ThemeLabels = {
  dark: "Dark",
  light: "Light",
}

export type IThemeContext = {
  base: "dark" | "light"
  setBase: Dispatch<SetStateAction<"light" | "dark">>
}

export const ThemeContext = createContext<IThemeContext>({
  base: "dark",
  setBase: () => {},
})
