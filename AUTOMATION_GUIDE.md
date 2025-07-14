# 블로그 자동 업데이트 설정 가이드

## 현재 구현된 자동화 방법들

### 1. ISR (Incremental Static Regeneration) - 기본 설정 ✅
- **현재 설정**: 60초마다 자동 재검증
- **장점**: 추가 설정 없이 작동
- **단점**: 최대 60초의 지연 시간

### 2. 클라이언트 사이드 자동 새로고침 ✅
- **현재 설정**: 5분마다 자동으로 페이지 데이터 새로고침
- **장점**: 사용자가 페이지에 머물러 있을 때 자동 업데이트
- **단점**: 프로덕션 환경에서만 작동

### 3. GitHub Actions 자동화 ✅
- **설정 필요**: GitHub Secrets에 추가
  - `SITE_URL`: https://your-blog.vercel.app
  - `REVALIDATION_SECRET`: 810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe
- **실행 주기**: 매시간
- **수동 실행**: Actions 탭에서 "Run workflow" 클릭

### 4. 브라우저 북마크릿 ✅
1. `bookmarklet.html` 파일을 브라우저에서 열기
2. 북마크 버튼을 북마크 바로 드래그
3. 북마크 편집하여 URL과 SECRET 변경
4. Notion 수정 후 북마크 클릭하면 즉시 업데이트

### 5. Zapier/Make.com 자동화 (권장) 🚀

#### Zapier 설정:
1. **Trigger**: Notion Database - New Database Item
2. **Action**: Webhook - POST
   - URL: `https://your-blog.vercel.app/api/webhook`
   - Headers: `x-webhook-secret: your-webhook-secret`
   - Method: POST

#### Make.com (구 Integromat) 설정:
1. **Watch Notion Database** 모듈 추가
2. **HTTP Request** 모듈 추가
   - URL: `https://your-blog.vercel.app/api/webhook`
   - Method: POST
   - Headers: `x-webhook-secret: your-webhook-secret`

### 6. n8n 자가 호스팅 옵션
```yaml
# docker-compose.yml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=password
    volumes:
      - n8n_data:/home/node/.n8n
volumes:
  n8n_data:
```

## 권장 설정 조합

### 🏆 최적 설정 (실시간 업데이트):
1. ISR 60초 (기본)
2. Zapier/Make.com 웹훅
3. 브라우저 북마크릿 (백업용)

### 💰 무료 설정:
1. ISR 60초 (기본)
2. GitHub Actions (매시간)
3. 브라우저 북마크릿

### 🛠️ 개발자 설정:
1. ISR 60초 (기본)
2. n8n 자가 호스팅
3. 커스텀 웹훅 스크립트

## 환경변수 정리

Vercel에 설정해야 할 환경변수:
```
NOTION_PAGE_ID=e447025afa8742f38782fc1c4cc344ac
REVALIDATION_SECRET=810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe
WEBHOOK_SECRET=your-webhook-secret-here
```

## 문제 해결

### 업데이트가 안 될 때:
1. Vercel Functions 로그 확인
2. 환경변수 설정 확인
3. API 엔드포인트 테스트:
   ```bash
   curl https://your-blog.vercel.app/api/revalidate?secret=YOUR_SECRET
   ```

### 느릴 때:
1. Vercel 리전을 가까운 곳으로 변경
2. ISR 시간을 30초로 단축
3. 클라이언트 자동 새로고침 간격 단축