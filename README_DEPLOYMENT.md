# Vercel 배포 및 Notion 업데이트 가속화 가이드

## 문제점
Notion에서 글을 작성/수정 후 Vercel에 반영되는데 시간이 오래 걸리는 이유:
1. Vercel CDN 캐싱
2. ISR (Incremental Static Regeneration) 지연
3. 정적 빌드 시간

## 해결 방법

### 1. On-Demand Revalidation 사용
수동으로 특정 페이지를 즉시 재검증:

```bash
# 홈페이지 재검증
curl https://your-site.vercel.app/api/revalidate?secret=your-secret-revalidation-token

# 특정 포스트 재검증
curl https://your-site.vercel.app/api/revalidate?secret=your-secret-revalidation-token&path=/your-post-slug
```

### 2. 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수 추가:
- `NOTION_PAGE_ID`: Notion 페이지 ID
- `REVALIDATION_SECRET`: 재검증용 비밀 토큰
- `WEBHOOK_SECRET`: 웹훅용 비밀 토큰 (선택사항)

### 3. 자동화 옵션

#### A. Zapier/Make.com 사용
1. Notion 데이터베이스 변경 감지
2. Webhook으로 `/api/webhook` 호출
3. 자동으로 페이지 재검증

#### B. GitHub Actions 사용
```yaml
name: Revalidate Blog
on:
  workflow_dispatch:
  schedule:
    - cron: '*/30 * * * *' # 30분마다

jobs:
  revalidate:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger revalidation
        run: |
          curl -X POST ${{ secrets.SITE_URL }}/api/revalidate?secret=${{ secrets.REVALIDATION_SECRET }}
```

#### C. 브라우저 북마크릿
```javascript
javascript:(function(){fetch('https://your-site.vercel.app/api/revalidate?secret=your-secret').then(r=>r.json()).then(d=>alert('Revalidated: '+d.path))})()
```

### 4. 최적화 팁

1. **ISR 시간 조정**: 
   - 개발: `revalidate: 1` (1초)
   - 프로덕션: `revalidate: 60` (1분) 또는 더 길게

2. **빌드 최적화**:
   ```javascript
   // next.config.js
   module.exports = {
     experimental: {
       isrMemoryCacheSize: 0, // ISR 캐시 비활성화
     },
   }
   ```

3. **Vercel 설정**:
   - Functions Region: 가장 가까운 지역 선택
   - Environment: Production으로 설정

### 5. 모니터링
Vercel Functions 로그에서 재검증 상태 확인:
- Vercel Dashboard > Functions > Logs

## 즉시 반영 워크플로우

1. Notion에서 글 작성/수정
2. 브라우저 북마크릿 클릭 또는 스크립트 실행
3. 1-2초 내 사이트에 반영

이 방법으로 Notion 변경사항을 거의 실시간으로 반영할 수 있습니다.