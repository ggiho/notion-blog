import React, { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const codeElement = document.querySelector(`#${className} code`)
    const code = codeElement?.textContent || ''
    
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-gray-700 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Copy code"
      >
        {copied ? (
          <FiCheck className="w-4 h-4 text-green-400" />
        ) : (
          <FiCopy className="w-4 h-4 text-gray-300" />
        )}
      </button>
      <pre id={className} className={className}>
        {children}
      </pre>
    </div>
  )
}

export default CodeBlock