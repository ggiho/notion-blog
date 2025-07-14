# 🚀 빠른 배포 가이드

## 방법 1: Vercel 버튼으로 원클릭 배포 (추천)

아래 링크를 클릭하면 자동으로 배포됩니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fggiho%2Fnotion-blog&env=NOTION_PAGE_ID,REVALIDATION_SECRET&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2Fggiho%2Fnotion-blog%23environment-variables&project-name=notion-blog&repository-name=notion-blog)

클릭 후:
1. GitHub 계정으로 로그인
2. 환경변수 입력:
   - `NOTION_PAGE_ID`: `e447025afa8742f38782fc1c4cc344ac`
   - `REVALIDATION_SECRET`: `810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe`
3. "Deploy" 클릭

## 방법 2: Vercel 대시보드에서 수동 배포

1. [Vercel Dashboard](https://vercel.com/new) 접속
2. "Import Git Repository" 클릭
3. GitHub 계정 연결 (처음인 경우)
4. `ggiho/notion-blog` 저장소 선택
5. Configure Project:
   - Framework Preset: Next.js (자동 감지)
   - Root Directory: ./
   - Build Command: 기본값 사용
   - Output Directory: 기본값 사용
6. Environment Variables 추가:
   - Key: `NOTION_PAGE_ID`, Value: `e447025afa8742f38782fc1c4cc344ac`
   - Key: `REVALIDATION_SECRET`, Value: `810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe`
7. "Deploy" 클릭

## 배포 후 설정

### 도메인 설정
- 기본: `giho.vercel.app`
- 커스텀 도메인: Settings → Domains에서 추가

### GitHub Secrets 설정 (자동 재검증용)
1. GitHub 저장소 → Settings → Secrets
2. 추가:
   - `SITE_URL`: `https://giho.vercel.app`
   - `REVALIDATION_SECRET`: `810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe`

## 확인
배포 완료 후 `https://giho.vercel.app` 접속하여 확인

## 문제 해결
- 빌드 실패: Vercel 대시보드에서 로그 확인
- 404 에러: 환경변수 설정 확인
- Notion 연결 실패: 페이지 공개 설정 확인