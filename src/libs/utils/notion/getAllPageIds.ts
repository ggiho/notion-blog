import { idToUuid } from 'notion-utils'
import { ExtendedRecordMap, ID } from 'notion-types'

export default function getAllPageIds(
  response: ExtendedRecordMap,
  viewId?: string
) {
  const collectionQuery = response?.collection_query
  
  // collectionQuery가 없거나 비어있으면 빈 배열 반환
  if (!collectionQuery || Object.keys(collectionQuery).length === 0) {
    return []
  }
  
  const views = Object.values(collectionQuery)[0]
  
  // views가 없으면 빈 배열 반환
  if (!views) {
    return []
  }

  let pageIds: ID[] = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views[vId]?.blockIds || []
  } else {
    const pageSet = new Set<ID>()
    // * type not exist
    Object.values(views).forEach((view: any) => {
      view?.collection_group_results?.blockIds?.forEach((id: ID) =>
        pageSet.add(id)
      )
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
