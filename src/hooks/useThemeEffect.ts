import { useEffect } from "react"
import CONFIG from "site.config"
import { ThemeType } from "@customTypes/index"

export const getTheme: () => ThemeType = () => {
  const themeConfig = CONFIG.blog.theme as "auto" & ThemeType
  if (themeConfig !== "auto") return themeConfig
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark"
  } else {
    return "light"
  }
}

const useThemeEffect = () => {
  useEffect(() => {
    if (typeof document !== "object") return
    const theme = getTheme()
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.add("notion-dark")
      document.documentElement.classList.remove("notion-light")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("notion-light")
      document.documentElement.classList.remove("notion-dark")
    }
  }, [])
}

export default useThemeEffect
