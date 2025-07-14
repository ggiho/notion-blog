import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify webhook secret if using automation tools
  const secret = req.headers['x-webhook-secret']
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    // Revalidate all pages
    await res.revalidate('/')
    
    // You can also revalidate specific posts based on webhook data
    // const { slug } = req.body
    // if (slug) {
    //   await res.revalidate(`/${slug}`)
    // }

    return res.json({ revalidated: true, time: new Date().toISOString() })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' })
  }
}