import Link from "next/link"
import CONFIG from "site.config"
import { formatDate } from "@/src/libs/utils"
import Tag from "./Tag"
import { TPost } from "../types"
import Image from "next/image"
import Category from "./Category"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = data.category?.[0] || undefined
  const readingTime = data.summary ? Math.ceil(data.summary.split(' ').length / 200) : 1

  return (
    <Link href={`/${data.slug}`}>
      <a className="group block h-full">
        <article className="relative h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-700">
          {/* Gradient overlay for visual interest */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Thumbnail */}
          {data.thumbnail && (
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={data.thumbnail}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
                layout="fill"
                alt={data.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {category && (
                <div className="absolute top-4 left-4 z-10">
                  <Category readOnly>{category}</Category>
                </div>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="relative flex-1 p-6 flex flex-col h-full">
            {/* Category for posts without thumbnail */}
            {!data.thumbnail && category && (
              <div className="mb-4">
                <Category readOnly>{category}</Category>
              </div>
            )}
            
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {data.title}
            </h2>
            
            {/* Summary */}
            {data.summary && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">
                {data.summary}
              </p>
            )}
            
            {/* Spacer for consistent height */}
            {!data.summary && <div className="flex-1" />}
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100 dark:border-gray-800/50">
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
                {/* Date */}
                <time className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
                </time>
                {/* Reading time */}
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime}분
                </span>
              </div>
              
              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap justify-end max-w-[40%]">
                  {data.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                      #{tag}
                    </span>
                  ))}
                  {data.tags.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-500">
                      +{data.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

export default PostCard