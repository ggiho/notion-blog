import CONFIG from "../../../site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"
import { getPageProperties } from "../utils/notion"
import { TPosts } from "@/src/types"

export const getPosts = async (): Promise<TPosts> => {
  try {
    const id = CONFIG.notionConfig.pageId
    const api = new NotionAPI()
    const response = await api.getPage(id)

    const collection = Object.values(response.collection)[0]
    const collectionViewId = Object.keys(response.collection_view)[0]
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id]?.value

    if (!rawMetadata || rawMetadata.type !== "collection_view_page") {
      console.error("Invalid page type:", rawMetadata?.type)
      return []
    }

    const result: TPosts = []

    if (!response.collection_view[collectionViewId]) {
      console.error("Collection view not found")
      return []
    }

    const collectionView = response.collection_view[collectionViewId]?.value
    const queryCollection = response.collection_query[id]?.[collectionViewId]
    const sortedRecordIds = queryCollection?.collection_group_results?.blockIds

    if (!sortedRecordIds) {
      console.error("No record IDs found")
      return []
    }

    for (const recordId of sortedRecordIds) {
      const properties = await getPageProperties(
        recordId,
        block,
        schema,
        collectionView
      )
      
      if (properties) {
        result.push(properties)
      }
    }

    return result
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}