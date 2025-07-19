import Link from "next/link"
import CONFIG from "site.config"
import { formatDate } from "@/src/libs/utils"
import { TPost } from "../types"
import Image from "next/image"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = data.category?.[0] || undefined
  const readingTime = data.summary ? Math.ceil(data.summary.split(' ').length / 200) : 1

  return (
    <Link href={`/${data.slug}`} prefetch={false} className="group block h-full">
      <article className="card card-hover h-full flex flex-col overflow-hidden">
        {/* Thumbnail */}
        {data.thumbnail && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={data.thumbnail}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              fill
              alt={data.title}
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Category & Date */}
          <div className="mb-3 flex items-center justify-between text-sm">
            {category && (
              <span className="badge badge-primary">
                {category}
              </span>
            )}
            <time className="text-gray-500 dark:text-gray-400">
              {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
            </time>
          </div>
          
          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {data.title}
          </h3>
          
          {/* Summary */}
          {data.summary && (
            <p className="mb-4 line-clamp-2 flex-1 text-gray-600 dark:text-gray-400">
              {data.summary}
            </p>
          )}
          
          {/* Footer */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{readingTime} min read</span>
            </div>
            
            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="flex gap-2">
                {data.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Read more indicator */}
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
            Read article
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard