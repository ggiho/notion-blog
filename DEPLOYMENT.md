# Vercel 배포 가이드

## 새 저장소로 배포하기

### 1. GitHub 저장소 생성
```bash
# 새 저장소 생성 (notion-blog)
git remote remove origin
git remote add origin https://github.com/ggiho/notion-blog.git
git branch -M main
git push -u origin main
```

### 2. Vercel 프로젝트 설정

#### 방법 1: 기존 프로젝트 재사용
1. [Vercel Dashboard](https://vercel.com/dashboard)에서 기존 프로젝트 선택
2. Settings → Git → Disconnect from Git
3. Connect to Git → GitHub → `ggiho/notion-blog` 선택

#### 방법 2: 새 프로젝트 생성
1. [Vercel](https://vercel.com/new)에서 "Import Project"
2. GitHub 저장소 `ggiho/notion-blog` 선택
3. 프로젝트 이름: `notion-blog` 또는 원하는 이름

### 3. 환경변수 설정

Vercel Dashboard → Settings → Environment Variables에서 추가:

```env
# 필수
NOTION_PAGE_ID=e447025afa8742f38782fc1c4cc344ac
REVALIDATION_SECRET=810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe

# 선택사항
WEBHOOK_SECRET=your-webhook-secret
GOOGLE_MEASUREMENT_ID=your-ga-id
GOOGLE_SITE_VERIFICATION=your-verification-code
```

### 4. 빌드 설정

- **Framework Preset**: Next.js (자동 감지됨)
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `.next` (기본값)
- **Install Command**: `npm install` (기본값)

### 5. 도메인 설정

#### 기본 도메인
- `notion-blog.vercel.app` (자동 생성)

#### 커스텀 도메인
1. Settings → Domains
2. Add Domain → 원하는 도메인 입력
3. DNS 설정 안내 따라하기

### 6. 배포 확인

```bash
# 로컬에서 빌드 테스트
npm run build

# Git push로 자동 배포
git add .
git commit -m "Deploy to Vercel"
git push
```

## 문제 해결

### 빌드 실패 시
1. Vercel Functions 로그 확인
2. 환경변수 설정 확인
3. `npm run build` 로컬 테스트

### 404 에러
1. `NOTION_PAGE_ID` 환경변수 확인
2. Notion 페이지 공개 설정 확인

### 업데이트 반영 안됨
```bash
# 수동 재검증
curl https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET
```

## 자동화 팁

### GitHub Actions 연동
`.github/workflows/revalidate.yml` 파일이 이미 설정되어 있음
- GitHub Secrets에 `SITE_URL`과 `REVALIDATION_SECRET` 추가

### Zapier/Make 웹훅
`/api/webhook` 엔드포인트 사용하여 Notion 변경 시 자동 업데이트