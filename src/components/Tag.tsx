import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  children: string
  onClick?: () => void
}

const Tag: React.FC<Props> = ({ children, onClick }) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) {
      onClick()
    } else {
      router.push(`/?tag=${children}`)
    }
  }
  
  return (
    <button
      onClick={handleClick}
      className="tag text-xs"
    >
      {children}
    </button>
  )
}

export default Tag