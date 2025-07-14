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
    <div className="flex gap-12 max-w-7xl mx-auto px-4">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-gray-900 rounded-3xl py-12 px-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <article className="max-w-4xl mx-auto">
            {category && (
              <Category
                className="mb-2"
                readOnly={data.status?.[0] === "PublicOnDetail"}
              >
                {category}
              </Category>
            )}
            {data.type[0] === "Post" && <PostHeader data={data} />}
            {blockMap && (
              <div className="-mt-4 prose prose-lg dark:prose-invert max-w-none">
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
            {data.type[0] === "Post" && (
              <>
                <Footer />
                <CommentBox data={data} />
              </>
            )}
          </article>
        </div>
      </div>

      {/* Table of Contents - Desktop Only */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <TableOfContents blockMap={blockMap} />
        </div>
      </aside>
    </div>
  )
}

export default PostDetail
