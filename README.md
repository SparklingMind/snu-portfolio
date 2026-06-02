# 정다희 포트폴리오 (Next.js + Vercel)

첨부 이미지 스타일(레트로 데스크톱 UI) 기반의 포트폴리오 사이트입니다.

## 실행 방법

```bash
cd snu-portfolio
npm run dev
```

브라우저에서 `http://localhost:3000` 를 열어 확인합니다.

## 빌드

```bash
cd snu-portfolio
npm run build
```

## Vercel 배포

현재 Git 저장소(Next.js 앱)는 `snu-portfolio/` 폴더입니다.

- Vercel에서 Import 시 **Root Directory**: `snu-portfolio`
- Framework Preset: Next.js (자동 인식)
- Build Command: `npm run build` (기본값)
- Output Directory: `.next` (기본값)

