declare namespace NodeJS {
  interface ProcessEnv {
    NOTION_PAGE_ID: string
    GOOGLE_MEASUREMENT_ID?: string
    GOOGLE_SITE_VERIFICATION?: string
    REVALIDATION_SECRET: string
    WEBHOOK_SECRET?: string
    VERCEL_ENV?: 'production' | 'preview' | 'development'
    SITE_URL?: string
  }
}