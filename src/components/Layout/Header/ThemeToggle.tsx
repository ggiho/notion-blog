import CONFIG from "@/site.config"
import { ThemeType } from "@/src/types"
import { getTheme } from "@hooks/useThemeEffect"
import React, { useEffect, useState } from "react"

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<ThemeType>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTheme(getTheme())
  }, [])

  const handleClick = () => {
    const changedTheme = theme !== "dark" ? "dark" : "light"
    localStorage.setItem("theme", changedTheme)
    setTheme(changedTheme)
    changedTheme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark")
  }

  if (CONFIG.blog.theme !== "auto" || !mounted) return null
  
  return (
    <button
      onClick={handleClick}
      className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-110 group"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-amber-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle