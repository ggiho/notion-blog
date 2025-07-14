import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AutoRefresh = ({ interval = 300000 }) => { // 5분마다
  const router = useRouter()
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const timer = setInterval(() => {
        // 페이지를 새로고침하지 않고 데이터만 리프레시
        router.replace(router.asPath)
      }, interval)
      
      return () => clearInterval(timer)
    }
  }, [router, interval])
  
  return null
}

export default AutoRefresh