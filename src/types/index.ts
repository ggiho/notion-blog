import { ExtendedRecordMap } from 'notion-types'

export type TPostType = "Post" | "Page" | "Paper"
export type TPostStatus = "Private" | "Public" | "PublicOnDetail"

export type TPost = {
  id: string
  date: { start_date: string }
  type: TPostType[]
  slug: string
  tags?: string[]
  category?: string[]
  summary?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
  title: string
  status: TPostStatus[]
  createdTime: string
  publishedTime?: string
  fullWidth: boolean
  thumbnail?: string
}

export type TPosts = TPost[]

export type TTags = Record<string, number>
export type TCategories = Record<string, number>

export type PostDetailProps = {
  blockMap: ExtendedRecordMap
  data: TPost
}

export type ThemeType = "light" | "dark"

export type ConfigType = {
  profile: {
    name: string
    image: string
    role: string
    bio: string
    email: string
    linkedin: string
    github: string
    instagram: string
  }
  projects: Array<{
    name: string
    href: string
  }>
  blog: {
    title: string
    description: string
    theme: ThemeType | "auto"
  }
  link: string
  since: number
  lang: string
  ogImageGenerateURL: string
  seo: {
    keywords: string[]
  }
  notionConfig: {
    pageId: string
  }
  googleAnalytics: {
    enable: boolean
    config: {
      measurementId: string
    }
  }
  googleSearchConsole: {
    enable: boolean
    config: {
      siteVerification: string
    }
  }
  utterances: {
    enable: boolean
    config: {
      repo: string
      "issue-term": string
      label: string
    }
  }
  cusdis: {
    enable: boolean
    config: {
      host: string
      appid: string
    }
  }
  isProd: boolean
}