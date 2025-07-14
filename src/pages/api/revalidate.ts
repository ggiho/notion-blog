import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const path = req.query.path as string
    
    if (!path) {
      // Revalidate homepage
      await res.revalidate('/')
      return res.json({ revalidated: true, path: '/' })
    }
    
    // Revalidate specific path
    await res.revalidate(path)
    return res.json({ revalidated: true, path })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}