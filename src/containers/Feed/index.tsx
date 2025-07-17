import { useState } from "react"
import Hero from "@components/Hero"
import * as Lists from "./components/lists"
import { TCategories, TPosts, TTags } from "@customTypes/index"
import Footer from "./components/Footer"

type Props = {
  categories: TCategories
  tags: TTags
  posts: TPosts
}

const Feed: React.FC<Props> = ({ categories, tags, posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter posts based on selection
  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || post.category?.includes(selectedCategory)
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesTag && matchesSearch
  })

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <section id="posts" className="py-20 md:py-24">
        <div className="container">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
              Latest Articles
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              데이터베이스, DevOps, 그리고 개발에 대한 인사이트와 경험을 공유합니다
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-10">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-gray-200 bg-white px-6 py-4 text-lg shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-gray-700 dark:focus:ring-gray-800"
              />
              <svg className="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`badge px-4 py-2 text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  All
                </button>
                {Object.keys(categories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`badge px-4 py-2 text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category} ({categories[category]})
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tag Filter */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(tags).slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    className={`badge px-3 py-1.5 text-sm transition-colors ${
                      selectedTag === tag
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    #{tag} ({tags[tag]})
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Posts Grid */}
          <Lists.PostList posts={filteredPosts} />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  )
}

export default Feed
