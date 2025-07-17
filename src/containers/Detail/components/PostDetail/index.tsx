import {
  NotionRenderer,
  Equation,
  Code,
  Collection,
  CollectionRow,
} from "react-notion-x"
import { TPost } from "@/src/types"
import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "@components/Category"
import TableOfContents from "./TableOfContents"

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  blockMap: any
  data: TPost
}

const PostDetail: React.FC<Props> = ({ blockMap, data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:flex lg:gap-12">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <div className="mx-auto max-w-prose">
              {/* Header */}
              <header className="mb-8">
                {category && (
                  <div className="mb-4">
                    <span className="badge badge-primary">
                      {category}
                    </span>
                  </div>
                )}
                {data.type[0] === "Post" && <PostHeader data={data} />}
              </header>
              
              {/* Content */}
              {blockMap && (
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
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
              
              {/* Footer */}
              {data.type[0] === "Post" && (
                <div className="mt-12 space-y-8">
                  <Footer />
                  <CommentBox data={data} />
                </div>
              )}
            </div>
          </article>

          {/* Table of Contents - Desktop Only */}
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents blockMap={blockMap} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
