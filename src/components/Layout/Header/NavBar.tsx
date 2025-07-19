import Link from 'next/link'
import { useRouter } from 'next/router'

const NavBar: React.FC = () => {
  const router = useRouter()
  const links = [
    { id: 1, name: 'Blog', to: '/' },
    { id: 2, name: 'About', to: '/about' }
  ]
  
  return (
    <nav className="flex items-center">
      <ul className="flex items-center gap-1">
        {links.map((link) => {
          const isActive = router.pathname === link.to
          return (
            <li key={link.id}>
              <Link href={link.to} className={`
                px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${isActive 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
              `}>
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar