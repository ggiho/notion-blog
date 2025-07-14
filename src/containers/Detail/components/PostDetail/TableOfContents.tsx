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
    // Extract headings from blockMap
    const extractHeadings = () => {
      const headings: TocItem[] = []
      
      if (!blockMap?.block) return headings

      Object.keys(blockMap.block).forEach((blockId) => {
        const block = blockMap.block[blockId]?.value
        if (!block) return

        // Check if it's a heading block
        if (block.type === 'header' || block.type === 'sub_header' || block.type === 'sub_sub_header') {
          const text = block.properties?.title?.[0]?.[0] || ''
          if (text) {
            headings.push({
              id: blockId,
              text,
              level: block.type === 'header' ? 1 : block.type === 'sub_header' ? 2 : 3
            })
          }
        }
      })

      return headings
    }

    setToc(extractHeadings())
  }, [blockMap])

  useEffect(() => {
    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -70% 0%',
        threshold: 0
      }
    )

    // Observe all heading elements
    toc.forEach((item) => {
      const element = document.getElementById(`notion-block-${item.id}`)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  const handleClick = (id: string) => {
    const element = document.getElementById(`notion-block-${id}`)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (toc.length === 0) return null

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
        목차
      </h3>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={`
                block w-full text-left py-1.5 px-3 rounded-lg transition-all duration-200
                ${activeId === item.id
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
              `}
            >
              <span className="line-clamp-2">{item.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents