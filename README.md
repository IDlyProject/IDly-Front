# IDly Front

IDly 프론트엔드 레포지토리입니다. 이메일 계정과 연결된 서비스 계정을 분석하고, 위험 계정을 정리하고, 보안 리포트와 조치 흐름을 제공하는 모바일 중심 웹 앱으로 구성되어 있습니다.

현재 프로젝트는 Vite 기반 React SPA로 구현되어 있으며, 일부 화면은 실제 API를 사용하고 일부 화면은 목 데이터 기반으로 동작합니다.

## 프로젝트 개요

- 온보딩부터 메일 계정 연동, 분석 실행, 홈 대시보드, 보안 리포트, 계정 정리, 마이페이지 흐름까지 포함한 프론트엔드 프로젝트
- 모바일 뷰를 우선한 UI 구성
- `react-router-dom` 기반 라우팅
- 백엔드 인증 쿠키를 포함하는 fetch 래퍼와 access token refresh 재시도 로직 포함
- Vercel 배포를 고려한 SPA rewrite 설정 포함

## 개발 환경

자유롭게 개발 가능한 일반적인 Node.js 프론트엔드 환경을 기준으로 구성되어 있습니다.

- Runtime: Node.js LTS 권장
- Package Manager: npm
- Bundler: Vite 8
- Framework: React 19
- Language: JavaScript (ES Modules)
- Styling: Tailwind CSS 4
- Routing: React Router 7
- Lint: ESLint 10
- Deployment target: Vercel

권장 로컬 환경 예시:

- Node.js 20+
- npm 10+

## 기술 스택

### Core

- React 19
- Vite 8
- React Router DOM 7

### Styling

- Tailwind CSS 4
- Pretendard

### Tooling

- ESLint
- @vitejs/plugin-react
- `@` path alias (`src` 기준)

## 주요 기능

- 온보딩 및 로그인 진입
- 메일 계정 추가 및 연결 흐름
- 계정 분석 실행 및 진행률 폴링
- 홈 대시보드에서 전체/계정별 서비스 현황 확인
- 위험 계정 표시 및 정리 화면 이동
- 보안 리포트 확인
- 계정별 조치 챗 UI
- 알림, 마이페이지, 탈퇴 관련 화면

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버는 Vite 개발 서버입니다.

주요 스크립트:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 라우팅 구성

주요 라우트 예시:

- `/` : 스플래시
- `/onboarding/*` : 로그인 및 계정 연결 플로우
- `/analysis` : 분석 진행 화면
- `/home` : 홈 대시보드
- `/organize` : 계정 정리 화면
- `/security-report` : 보안 리포트
- `/security-report/assistant` : 보안 도우미
- `/my` : 마이페이지
- `/account/:accountId` : 계정 상세
- `/account/:accountId/action` : 계정 조치 챗 화면

일부 라우트는 `ProtectedRoute`로 보호됩니다.

## 프로젝트 구조

```text
src/
	api/                 API 요청 래퍼 및 도메인별 클라이언트
	assets/              아이콘, 이미지 등 정적 리소스
	components/          공통 레이아웃 및 UI 컴포넌트
	constants/           라우트, API 상수
	hooks/               공통 데이터 훅
	pages/               화면 단위 페이지
	routes/              라우터 및 보호 라우트 설정
	utils/               표시 로직, 아이콘 매핑 등 유틸
```

페이지 디렉터리는 기능 단위로 나뉘어 있으며, 일부 페이지는 내부 `components/`, `hooks/`, `mock*.js` 파일을 함께 가집니다.

## 배포

배포 링크 : https://i-dly-front.vercel.app/

- `vercel.json`에서 모든 경로를 `index.html`로 rewrite
- React Router 기반 SPA 직접 접근 대응

배포 빌드:

```bash
npm run build
```

## 참고 사항

- 스타일 시스템은 Tailwind 유틸리티 클래스를 중심으로 작성되어 있습니다.
