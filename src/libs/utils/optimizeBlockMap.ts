import { ExtendedRecordMap } from 'notion-types'

/**
 * 스마트 blockMap 최적화 함수
 * - 사용자 참조 데이터 보존하여 "missing user" 경고 방지
 * - 큰 페이지 데이터 축소 (특히 resume 페이지)
 * - 불필요한 메타데이터 제거
 */
export function optimizeBlockMap(blockMap: ExtendedRecordMap, slug?: string): ExtendedRecordMap {
  // 1단계: 콘텐츠에서 실제 참조되는 사용자 ID 찾기
  const referencedUserIds = findReferencedUsers(blockMap)
  
  // 2단계: 기본 최적화 - 불필요한 메타데이터 제거
  const optimizedMap: ExtendedRecordMap = {
    block: blockMap.block,
    collection: blockMap.collection,
    collection_view: blockMap.collection_view,
    notion_user: blockMap.notion_user,
    // 선택적 속성들은 제거하거나 빈 객체로 설정
    collection_query: {},
    signed_urls: {}
  }

  // preview_images는 완전히 제거 (선택적 속성)
  if (blockMap.preview_images) {
    // preview_images는 제거
  }

  // 3단계: 사용자 데이터 최적화 - 참조된 사용자만 보존
  optimizedMap.notion_user = referencedUserIds.size > 0 ? 
    filterReferencedUsers(blockMap.notion_user, referencedUserIds) : {}

  // 4단계: resume 페이지 특별 최적화
  const isResumePage = slug === 'resume'
  optimizedMap.block = isResumePage ? 
    optimizeBlocksForResume(blockMap.block) : 
    blockMap.block

  return optimizedMap
}

/**
 * blockMap에서 실제 참조되는 사용자 ID 찾기
 */
function findReferencedUsers(blockMap: ExtendedRecordMap): Set<string> {
  const userIds = new Set<string>()
  
  // 일단 모든 사용자 데이터를 보존하여 missing user 경고 방지
  // TODO: 나중에 실제 참조만 찾는 로직으로 개선
  if (blockMap.notion_user) {
    Object.keys(blockMap.notion_user).forEach(userId => {
      userIds.add(userId)
    })
  }
  
  // 추가: 실제 텍스트 콘텐츠에서 사용자 참조 패턴도 검사
  Object.values(blockMap.block).forEach(({ value: block }) => {
    if (block?.properties) {
      Object.values(block.properties).forEach((property: any) => {
        if (Array.isArray(property)) {
          searchUserReferencesInProperty(property, userIds)
        }
      })
    }
  })
  
  return userIds
}

/**
 * 속성에서 사용자 참조 검색
 */
function searchUserReferencesInProperty(property: any[], userIds: Set<string>) {
  property.forEach((textItem: any) => {
    if (Array.isArray(textItem) && textItem.length >= 2) {
      const decorations = textItem[1]
      if (Array.isArray(decorations)) {
        decorations.forEach((decoration: any) => {
          if (Array.isArray(decoration)) {
            // 사용자 참조 패턴: ['‣', ['u', 'user-id']]
            if (decoration[0] === '‣' && 
                Array.isArray(decoration[1]) && 
                decoration[1][0] === 'u') {
              userIds.add(decoration[1][1])
            }
          }
        })
      }
    }
  })
}

/**
 * 참조된 사용자만 필터링
 */
function filterReferencedUsers(notionUser: any, referencedUserIds: Set<string>) {
  const filteredUsers: any = {}
  
  referencedUserIds.forEach(userId => {
    if (notionUser[userId]) {
      filteredUsers[userId] = notionUser[userId]
    }
  })
  
  return filteredUsers
}

/**
 * Resume 페이지용 블록 최적화 - 안전한 최적화만 적용
 */
function optimizeBlocksForResume(blocks: any) {
  const optimizedBlocks: any = {}
  
  Object.entries(blocks).forEach(([blockId, blockData]: [string, any]) => {
    if (blockData?.value) {
      // 안전한 메타데이터만 제거 (시간 관련 데이터는 보존)
      const { 
        space_id,
        permissions,
        file_ids,
        ...essentialBlockData 
      } = blockData.value
      
      optimizedBlocks[blockId] = {
        ...blockData,
        value: essentialBlockData
      }
    } else {
      optimizedBlocks[blockId] = blockData
    }
  })
  
  return optimizedBlocks
}