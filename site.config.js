const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Giho Seong",
    image: "/profile-new.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Database Administrator",
    bio: "Aurora for MySQL 운영 중",
    email: "wasd92@naver.com",
    linkedin: "giho-seong",
    github: "ggiho",
    instagram: "",
  },
  projects: [
    {
      name: `notion-blog`,
      href: "https://github.com/ggiho/notion-blog",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Giho's Tech Blog",
    description: "Database, DevOps, and Development Notes",
    theme: "auto", // ['light', 'dark', 'auto']
  },

  // CONFIG configration (required)
  link: "https://giho.vercel.app",
  since: 2023, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash
  seo: {
    keywords: ["Database", "MySQL", "Aurora", "DynamoDB", "DevOps", "AWS", "Tech Blog"],
  },

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "ggiho/notion-blog",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
module.exports = CONFIG
