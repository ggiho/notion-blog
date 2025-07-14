import React from "react"
import Link from "next/link"
import CONFIG from "site.config"

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className="group" aria-label={CONFIG.blog.title}>
        <div className="flex items-center gap-3">
          {/* Logo icon */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div className="absolute inset-0 bg-blue-600 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          
          {/* Text */}
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {CONFIG.blog.title}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Logo