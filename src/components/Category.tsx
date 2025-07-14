import { useRouter } from "next/router"
import React from "react"

// Modern color palette for categories
const MODERN_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
]

export const getColorClassByName = (name: string): string => {
  try {
    let sum = 0
    name.split("").forEach((alphabet) => (sum = sum + alphabet.charCodeAt(0)))
    return MODERN_COLORS[sum % MODERN_COLORS.length]
  } catch {
    return MODERN_COLORS[0]
  }
}

type Props = {
  className?: string
  children: string
  readOnly?: boolean
}

const Category: React.FC<Props> = ({
  readOnly = false,
  className,
  children,
}) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (readOnly) return
    e.preventDefault()
    e.stopPropagation()
    router.push(`/?category=${children}`)
  }
  
  return (
    <button
      onClick={handleClick}
      disabled={readOnly}
      className={[
        "inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg",
        "transition-all duration-200",
        getColorClassByName(children),
        !readOnly && "hover:opacity-80 cursor-pointer",
        readOnly && "cursor-default",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  )
}

export default Category