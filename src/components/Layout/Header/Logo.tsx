import React from "react"
import Link from "next/link"
import CONFIG from "site.config"

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className="group" aria-label={CONFIG.blog.title}>
        <div className="flex items-center gap-3">
          {/* Logo icon - 2025 trend: Bold geometric shapes */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
              <span className="text-white font-black text-xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300">G</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          
          {/* Text - Big & Bold typography */}
          <div className="text-xl font-black text-neutral-900 dark:text-neutral-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 dark:group-hover:from-amber-400 dark:group-hover:to-orange-400 transition-all duration-300 uppercase tracking-tight">
            {CONFIG.blog.title}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Logo