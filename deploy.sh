#!/bin/bash

# Vercel 배포 스크립트
echo "🚀 Vercel 배포를 시작합니다..."

# 환경변수 설정
export VERCEL_ORG_ID="your-org-id"
export VERCEL_PROJECT_ID="your-project-id"

# 프로덕션 배포
vercel --prod \
  --env NOTION_PAGE_ID=e447025afa8742f38782fc1c4cc344ac \
  --env REVALIDATION_SECRET=810ff72f1d0552ebe2b0b08eca9478238eeedee82178c2de9b69db577f463ffe \
  --name notion-blog \
  --yes

echo "✅ 배포가 완료되었습니다!"