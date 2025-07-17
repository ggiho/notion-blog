import PostCard from "@components/PostCard"
import { TPosts } from "@/src/types"
import React from "react"

type Props = {
  posts: TPosts
}

const PostList: React.FC<Props> = ({ posts }) => {
  if (!posts.length) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😺</div>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          검색 결과가 없습니다
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          다른 키워드로 검색해보세요
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {posts.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  )
}

export default React.memo(PostList)