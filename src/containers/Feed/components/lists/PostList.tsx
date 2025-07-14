import PostCard from "@components/PostCard"
import { TPosts } from "@/src/types"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import { DEFAULT_CATEGORY } from "@/src/constants"

type Props = {
  q: string
  posts: TPosts
}

const PostList: React.FC<Props> = ({ q, posts }) => {
  const router = useRouter()

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  const filteredPosts = useMemo(() => {
    let filtered = posts

    // keyword search
    if (q) {
      filtered = filtered.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })
    }

    // tag filter
    if (currentTag) {
      filtered = filtered.filter(
        (post) => post.tags?.includes(currentTag)
      )
    }

    // category filter
    if (currentCategory !== DEFAULT_CATEGORY) {
      filtered = filtered.filter(
        (post) => post.category?.includes(currentCategory)
      )
    }

    // order
    if (currentOrder !== "desc") {
      filtered = [...filtered].reverse()
    }

    return filtered
  }, [q, currentTag, currentCategory, currentOrder, posts])

  return (
    <div className="my-2">
      {!filteredPosts.length && (
        <p className="text-gray-500 dark:text-gray-300">Nothing! 😺</p>
      )}
      {filteredPosts.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </div>
  )
}

export default React.memo(PostList)