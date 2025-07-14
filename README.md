# 🚀 Notion Blog

> Notion을 CMS로 활용하는 개발자를 위한 Next.js 블로그 템플릿

[![Next.js](https://img.shields.io/badge/Next.js-12.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.2-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Notion API](https://img.shields.io/badge/Notion-API-000000?logo=notion)](https://developers.notion.com/)

[데모 사이트](https://notion-blog.vercel.app) | [Notion 템플릿](https://giho.notion.site/e447025afa8742f38782fc1c4cc344ac)

## ✨ 특징

### 📝 간편한 콘텐츠 관리
- **Notion이 곧 CMS**: 별도의 관리자 페이지 없이 Notion에서 직접 글 작성
- **실시간 동기화**: 최대 60초 내 자동 반영 (ISR 적용)
- **마크다운 지원**: Notion의 모든 블록 타입 지원

### 🎨 현대적인 디자인
- **반응형 레이아웃**: 모바일, 태블릿, 데스크톱 완벽 지원
- **다크모드**: 시스템 설정 연동 및 수동 전환
- **커스터마이징**: Tailwind CSS로 손쉬운 스타일 변경

### 🔧 개발자 친화적
- **TypeScript**: 완벽한 타입 안전성
- **최적화된 성능**: Next.js ISR + 이미지 최적화
- **SEO 최적화**: 동적 메타태그, OG 이미지, 사이트맵 자동 생성

### 🛠️ 강력한 기능
- **태그 & 카테고리**: 콘텐츠 분류 및 필터링
- **검색 기능**: 실시간 검색
- **댓글 시스템**: GitHub Issues 기반 Utterances
- **분석 도구**: Google Analytics 연동

## 🚀 5분 만에 시작하기

### 사전 준비
- Node.js 14.0 이상
- GitHub 계정
- Vercel 계정 (무료)

### 1️⃣ Notion 페이지 준비

1. [템플릿 복제하기](https://giho.notion.site/e447025afa8742f38782fc1c4cc344ac) → "Duplicate" 클릭
2. 우측 상단 "Share" → "Share to web" 활성화
3. 링크에서 페이지 ID 복사
   ```
   https://notion.site/[이 부분이 PAGE_ID]?v=xxx
   ```

### 2️⃣ 프로젝트 설정

```bash
# 템플릿 사용
npx create-next-app my-blog --example https://github.com/ggiho/notion-blog

# 또는 직접 클론
git clone https://github.com/ggiho/notion-blog.git my-blog
cd my-blog
npm install
```

### 3️⃣ 환경변수 설정

```bash
# .env.local 생성
echo "NOTION_PAGE_ID=your_page_id_here" > .env.local
```

### 4️⃣ 로컬 실행

```bash
npm run dev
# http://localhost:3000 접속
```

## 📦 Vercel 배포

### 자동 배포 (추천)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fggiho%2Fnotion-blog&env=NOTION_PAGE_ID&envDescription=Notion%20%ED%8E%98%EC%9D%B4%EC%A7%80%20ID&envLink=https%3A%2F%2Fgithub.com%2Fggiho%2Fnotion-blog%23%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98)

### 수동 배포

1. GitHub에 푸시
2. [Vercel](https://vercel.com/new) → Import Git Repository
3. 환경변수 추가:
   - `NOTION_PAGE_ID`: 필수
   - `REVALIDATION_SECRET`: 선택 (On-demand ISR용)

## ⚙️ 커스터마이징

### 기본 설정 (`site.config.js`)

```javascript
const CONFIG = {
  // 프로필 설정
  profile: {
    name: "Your Name",
    role: "Frontend Developer",
    bio: "I love coding",
    email: "your@email.com",
    github: "yourusername",
    linkedin: "yourprofile",
  },
  
  // 블로그 설정
  blog: {
    title: "My Dev Blog",
    description: "개발 일기와 학습 기록",
    theme: "auto", // 'light' | 'dark' | 'auto'
  },
  
  // SEO 설정
  seo: {
    keywords: ["개발", "프로그래밍", "JavaScript"],
  },
  
  // 언어 설정
  lang: "ko-KR", // 한국어
}
```

### 스타일 커스터마이징

```css
/* styles/globals.css */
:root {
  --primary-color: #0070f3;
  --secondary-color: #ff6b6b;
}
```

## 🔄 콘텐츠 업데이트

### 자동 업데이트
- 기본적으로 60초마다 자동 갱신
- 페이지 방문 시 백그라운드에서 체크

### 즉시 업데이트
```bash
# API 호출로 즉시 갱신
curl -X POST https://your-blog.vercel.app/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret"}'
```

### 자동화 옵션
- **GitHub Actions**: 주기적 갱신
- **Zapier/Make**: Notion 변경 감지
- **웹훅**: 커스텀 트리거

자세한 내용은 [자동화 가이드](./AUTOMATION_GUIDE.md) 참조

## 📁 프로젝트 구조

```
notion-blog/
├── src/
│   ├── components/      # 재사용 컴포넌트
│   ├── containers/      # 페이지 컨테이너
│   ├── hooks/          # 커스텀 훅
│   ├── libs/           # 유틸리티 함수
│   ├── pages/          # Next.js 페이지
│   ├── styles/         # 글로벌 스타일
│   └── types/          # TypeScript 타입
├── public/             # 정적 파일
├── site.config.js      # 사이트 설정
└── package.json
```

## 🤝 기여하기

이슈와 PR은 언제나 환영합니다!

1. Fork 하기
2. Feature 브랜치 생성 (`git checkout -b feature/amazing`)
3. 커밋 (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Pull Request 생성

## 📝 라이선스

MIT License - 자유롭게 사용하세요!

## 🙏 크레딧

- [morethan-log](https://github.com/morethanmin/morethan-log) - 원본 프로젝트
- [Next.js](https://nextjs.org/) - React 프레임워크
- [Notion API](https://developers.notion.com/) - 콘텐츠 관리
- [Vercel](https://vercel.com/) - 호스팅 플랫폼

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ggiho">ggiho</a>
</p>