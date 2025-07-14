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

  return (
    <Link href={`/${data.slug}`}>
      <a className="group block">
        <article className="card card-hover h-full flex flex-col">
          {/* Thumbnail */}
          {data.thumbnail && (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
              <Image
                src={data.thumbnail}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                layout="fill"
                alt={data.title}
              />
              {category && (
                <div className="absolute top-4 left-4">
                  <Category>{category}</Category>
                </div>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Category for posts without thumbnail */}
            {!data.thumbnail && category && (
              <div className="mb-4">
                <Category>{category}</Category>
              </div>
            )}
            
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {data.title}
            </h2>
            
            {/* Summary */}
            {data.summary && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                {data.summary}
              </p>
            )}
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              {/* Date */}
              <time className="text-sm text-gray-500 dark:text-gray-500">
                {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
              </time>
              
              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-end">
                  {data.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-xs text-gray-500 dark:text-gray-500">
                      #{tag}
                    </span>
                  ))}
                  {data.tags.length > 2 && (
                    <span className="text-xs text-gray-400 dark:text-gray-600">
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