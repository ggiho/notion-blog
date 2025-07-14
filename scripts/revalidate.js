#!/usr/bin/env node

const SITE_URL = process.env.SITE_URL || 'https://your-site.vercel.app'
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET

async function revalidate(path = '/') {
  const url = `${SITE_URL}/api/revalidate?secret=${REVALIDATION_SECRET}&path=${path}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    
    if (response.ok) {
      console.log(`✅ Successfully revalidated: ${data.path}`)
    } else {
      console.error(`❌ Failed to revalidate: ${data.message}`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Usage: node scripts/revalidate.js [path]
const path = process.argv[2]
revalidate(path)