import CONFIG from "@/site.config"
import Tag from "@components/Tag"
import { TPost } from "@/src/types"
import { formatDate } from "@/src/libs/utils"
import Image from "next/image"
import React from "react"

type Props = {
  data: TPost
}

const PostHeader: React.FC<Props> = ({ data }) => {
  const readingTime = data.summary ? Math.ceil(data.summary.split(' ').length / 200) : 5
  
  return (
    <>
      <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
        {data.title}
      </h1>
      
      {data.summary && (
        <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
          {data.summary}
        </p>
      )}
      
      {data.type[0] !== "Paper" && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {/* Author */}
          {data.author && data.author[0] && data.author[0].name && (
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                src={data.author[0].profile_photo || CONFIG.profile.image}
                alt="profile_photo"
                width={32}
                height={32}
              />
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {data.author[0].name}
              </span>
            </div>
          )}
          
          {/* Date */}
          <time className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
          </time>
          
          {/* Reading Time */}
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} min read
          </span>
        </div>
      )}
      
      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags.map((tag: string) => (
            <span key={tag} className="badge">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Thumbnail */}
      {data.thumbnail && (
        <div className="mt-8 mb-8 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <div className="relative aspect-[16/9]">
            <Image
              src={data.thumbnail}
              className="object-cover"
              fill
              alt={data.title}
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PostHeader
