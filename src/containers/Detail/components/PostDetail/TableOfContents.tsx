import React, { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface Props {
  blockMap: any
}

const TableOfContents: React.FC<Props> = ({ blockMap }) => {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from DOM after render
    const extractHeadings = () => {
      const headings: TocItem[] = []
      
      // Wait for notion content to render
      setTimeout(() => {
        // Find all heading elements in the rendered content
        const headingElements = document.querySelectorAll('.notion-h, .notion-h1, .notion-h2, .notion-h3')
        
        headingElements.forEach((element) => {
          const text = element.textContent || ''
          const id = element.id || `heading-${headings.length}`
          
          // Set ID if not exists
          if (!element.id) {
            element.id = id
          }
          
          // Determine level based on class
          let level = 1
          if (element.classList.contains('notion-h2')) level = 2
          else if (element.classList.contains('notion-h3')) level = 3
          
          if (text.trim()) {
            headings.push({ id, text: text.trim(), level })
          }
        })
        
        setToc(headings)
      }, 500)
    }

    extractHeadings()
  }, [blockMap])

  useEffect(() => {
    if (toc.length === 0) return

    // Set up intersection observer for active section tracking
    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all heading elements
    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (toc.length === 0) return null

  return (
    <div className="sticky top-24">
      <nav className="relative">
        
        {/* Background track */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800" />
        
        <ul className="relative space-y-1">
          {toc.map((item, index) => {
            const isActive = activeId === item.id
            const indent = (item.level - 1) * 20
            
            return (
              <li
                key={item.id}
                style={{ paddingLeft: `${indent}px` }}
                className="relative"
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full transition-all duration-300" />
                )}
                
                <button
                  onClick={() => handleClick(item.id)}
                  className={`
                    block w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-200
                    ${isActive
                      ? 'text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }
                  `}
                >
                  <span className="line-clamp-2 leading-tight">
                    {item.level > 1 && <span className="text-gray-400 dark:text-gray-600 mr-1">•</span>}
                    {item.text}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents