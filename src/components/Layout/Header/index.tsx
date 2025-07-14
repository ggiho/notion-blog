import { useEffect, useState, useRef } from "react"
import CONFIG from "site.config"
import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  const navRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky-nav ${isScrolled ? 'sticky-nav-full' : ''}`}
      ref={navRef}
    >
      <div className={`container-wide h-16 flex items-center justify-between ${
        fullWidth ? "max-w-full px-4 md:px-24" : ""
      }`}>
        <Logo />
        <div className="flex items-center gap-2 sm:gap-4">
          <NavBar />
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header