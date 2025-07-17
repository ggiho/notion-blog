import { useRouter } from "next/router"
import React from "react"

// 2025 Trend: Warm, earthy color palette
const MODERN_COLORS = [
  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
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