import CONFIG from "@/site.config"
import Link from "next/link"
import React from "react"

const d = new Date()
const y = d.getFullYear()
const from = +CONFIG.since

type Props = {
  className?: string
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={`border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 ${className || ""}`}>
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
              {CONFIG.blog.title}
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {CONFIG.blog.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {CONFIG.profile.name} {from === y || !from ? y : `${from} - ${y}`}
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/feed" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`https://github.com/${CONFIG.profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  GitHub
                </a>
              </li>
              {CONFIG.profile.linkedin && (
                <li>
                  <a
                    href={`https://linkedin.com/in/${CONFIG.profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {CONFIG.profile.email && (
                <li>
                  <a
                    href={`mailto:${CONFIG.profile.email}`}
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
