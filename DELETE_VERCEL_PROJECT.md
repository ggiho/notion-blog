# Vercel 프로젝트 삭제 방법

## 웹에서 삭제하기

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 목록에서 `notion-blog` 찾기
3. 프로젝트 클릭
4. Settings 탭 이동
5. 페이지 맨 아래 "Delete Project" 섹션
6. "Delete" 버튼 클릭
7. 프로젝트 이름 입력하여 확인

## 삭제 후 재배포

프로젝트 삭제 후 다시 배포할 수 있습니다:

1. [새 프로젝트 생성](https://vercel.com/new)
2. GitHub 저장소 연결: `ggiho/notion-blog`
3. 환경변수 추가:
   - `NOTION_PAGE_ID`: `e447025afa8742f38782fc1c4cc344ac`
   - `REVALIDATION_SECRET`: `810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe`

## 다른 이름으로 배포

기존 프로젝트를 유지하면서 새 이름으로 배포:
- `giho-blog`
- `giho-notion-blog`
- `my-notion-blog`
- `giho-tech-blog`