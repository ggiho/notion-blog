import {
  NotionRenderer,
  Equation,
  Code,
  Collection,
  CollectionRow,
} from "react-notion-x"
import { TPost } from "@/src/types"
import React, { useEffect } from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "@components/Category"
import TableOfContents from "./TableOfContents"
import dynamic from "next/dynamic"

// Prism을 동적으로 로드
const loadPrism = async () => {
  if (typeof window !== 'undefined') {
    try {
      const Prism = (await import('prismjs')).default
      
      // 언어 컴포넌트를 동적으로 로드
      await Promise.all([
        // 자주 사용되는 언어들
        import('prismjs/components/prism-javascript'),
        import('prismjs/components/prism-typescript'),
        import('prismjs/components/prism-jsx'),
        import('prismjs/components/prism-tsx'),
        import('prismjs/components/prism-css'),
        import('prismjs/components/prism-python'),
        import('prismjs/components/prism-bash'),
        import('prismjs/components/prism-json'),
        import('prismjs/components/prism-markdown'),
        import('prismjs/components/prism-sql'),
        import('prismjs/components/prism-lua'),
        // 추가 언어 지원
        import('prismjs/components/prism-go'),
        import('prismjs/components/prism-rust'),
        import('prismjs/components/prism-java'),
        import('prismjs/components/prism-c'),
        import('prismjs/components/prism-cpp'),
        import('prismjs/components/prism-yaml'),
        import('prismjs/components/prism-docker'),
        import('prismjs/components/prism-vim')
      ])
      
      return Prism
    } catch (error) {
      console.error('Failed to load Prism:', error)
      return null
    }
  }
  return null
}

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  blockMap: any
  data: TPost
}

const PostDetail: React.FC<Props> = ({ blockMap, data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  useEffect(() => {
    const initPrism = async () => {
      const Prism = await loadPrism()
      if (Prism) {
        // 약간의 지연 후 하이라이팅 적용
        setTimeout(() => {
          Prism.highlightAll()
        
        // 코드블럭에 복사 버튼 추가
        const codeBlocks = document.querySelectorAll('pre[class*="language-"]')
        codeBlocks.forEach((block) => {
          // 이미 wrapper가 있는지 확인
          const parent = block.parentElement
          if (parent?.classList.contains('relative') && parent?.classList.contains('group')) {
            return // 이미 처리된 블록은 건너뛰기
          }
          
          if (!block.querySelector('.copy-button') && !block.parentElement?.querySelector('.copy-button')) {
            // 복사 버튼을 코드 블록 내부에 직접 추가
            const button = document.createElement('button')
            button.className = 'copy-button sticky top-2 float-right -mt-10 mr-2 px-3 py-1.5 rounded-md bg-gray-600/90 hover:bg-gray-700 dark:bg-gray-700/90 dark:hover:bg-gray-600 text-xs font-medium text-white transition-all duration-200 z-10 flex items-center gap-1.5 opacity-0'
            button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Copy</span>'
            button.onclick = () => {
              const code = block.querySelector('code')?.textContent || ''
              navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span class="text-green-400">Copied!</span>'
                setTimeout(() => {
                  button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Copy</span>'
                }, 1500)
              })
            }
            // 버튼을 코드 블록의 첫 번째 자식으로 추가
            block.insertBefore(button, block.firstChild)
          }
        })
      }, 100)
      }
    }
    
    initPrism()
  }, [blockMap])

  return (
    <>
      {/* Full width background */}
      <div className="w-full min-h-screen -mt-16 pt-16 bg-gray-50 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <article className="flex-1 lg:max-w-4xl">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Header Section */}
              <div className="px-8 py-10 lg:px-12 lg:py-12 border-b border-gray-100 dark:border-gray-800">
                {category && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {category}
                    </span>
                  </div>
                )}
                {data.type[0] === "Post" && <PostHeader data={data} />}
              </div>
              
              {/* Content */}
              {blockMap && (
                <div className="px-8 py-10 lg:px-12 prose prose-gray dark:prose-invert max-w-none">
                  <NotionRenderer
                    recordMap={blockMap}
                    components={{
                      equation: Equation,
                      code: Code,
                      collection: Collection,
                      collectionRow: CollectionRow,
                    }}
                    mapPageUrl={mapPageUrl}
                  />
                </div>
              )}
            </div>
            
            {/* Footer Section */}
            {data.type[0] === "Post" && (
              <div className="mt-8 space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                  <Footer />
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                  <CommentBox data={data} />
                </div>
              </div>
            )}
          </article>

          {/* Table of Contents - Desktop Only */}
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <TableOfContents blockMap={blockMap} />
            </div>
          </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail
