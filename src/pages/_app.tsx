import 'react-notion-x/src/styles.css'
import 'katex/dist/katex.min.css'
import 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-sql'
/* import 'prismjs/themes/prism-tomorrow.css' */
/* import '@styles/prism-vibrant-theme.css' */
/* import '@styles/prism-onedark.css' */
import '@styles/prism-morethan.css'
import '@styles/globals.css'
import '@styles/notion.css'
import useThemeEffect from '@hooks/useThemeEffect'
import useGtagEffect from '@hooks/useGtagEffect'
import Scripts from '@components/Scripts'
import AutoRefresh from '@components/AutoRefresh'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'

export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  useThemeEffect()
  useGtagEffect()

  return (
    <>
      <Scripts />
      <AutoRefresh interval={300000} />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp
