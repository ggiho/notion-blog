import { useEffect, useState } from "react"
import Link from "next/link"
import CONFIG from "site.config"
import ThemeToggle from "./ThemeToggle"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "blur-background border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className={fullWidth ? "w-full px-6 md:px-12" : "container"}>
        <nav className="mx-auto max-w-7xl flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400">
          <span className="gradient-text">Tech</span>
          <span className="hidden sm:inline">Blog</span>
        </Link>
        
        {/* Navigation */}
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              Articles
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              About
            </Link>
            <a
              href={`https://github.com/${CONFIG.profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              GitHub
            </a>
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        </nav>
      </div>
    </header>
  )
}

export default Header