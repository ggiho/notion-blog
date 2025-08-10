import { NotionAPI } from 'notion-client'

export async function getPostBlocks(id: string) {
  try {
    const api = new NotionAPI()
    
    const pageBlock = await api.getPage(id)
    
    if (!pageBlock) {
      console.error(`Failed to fetch page blocks for id: ${id}`)
      throw new Error('Page blocks not found')
    }
    
    return pageBlock
  } catch (error) {
    console.error(`Error fetching post blocks for id ${id}:`, error)
    throw error
  }
}
