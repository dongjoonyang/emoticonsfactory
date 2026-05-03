# Vite + React 프로젝트 초기 설정 설계

**날짜:** 2026-05-03  
**프로젝트:** emoticonsfactory/frontend

---

## 개요

기존 TypeScript 전용 프로젝트를 Vite + React 기반으로 완전히 재구성한다. CSS는 CSS Modules를 사용하고, React Router, Zustand, Axios를 초기부터 포함한다.

---

## 기술 스택

| 항목 | 선택 | 버전 |
|------|------|------|
| 번들러 | Vite | latest |
| UI | React + TypeScript | React 18 |
| 스타일 | CSS Modules | Vite 내장 지원 |
| 라우팅 | React Router | v6 |
| 상태 관리 | Zustand | latest |
| API | Axios | latest |

---

## 폴더 구조

```
frontend/
├── public/
├── src/
│   ├── features/                # 기능별 모듈 (추후 editor, gallery 등 추가)
│   ├── shared/
│   │   ├── components/          # 공통 재사용 컴포넌트
│   │   ├── hooks/               # 공통 커스텀 훅
│   │   └── api/
│   │       └── client.ts        # Axios 인스턴스
│   ├── pages/
│   │   └── HomePage/
│   │       ├── HomePage.tsx
│   │       └── HomePage.module.css
│   ├── store/                   # Zustand 스토어
│   ├── styles/
│   │   └── global.css           # CSS reset + CSS 변수
│   ├── App.tsx                  # React Router 설정
│   └── main.tsx                 # 진입점
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── package.json
```

---

## 주요 파일 명세

### `vite.config.ts`
- React 플러그인 (`@vitejs/plugin-react`) 포함
- CSS Modules는 Vite 기본 지원이므로 별도 설정 불필요 (`.module.css` 파일명 규칙)

### `shared/api/client.ts`
- Axios 인스턴스 생성
- `baseURL`: 환경변수 `VITE_API_BASE_URL`에서 읽음
- 요청 인터셉터: 공통 헤더 설정 (추후 인증 토큰 추가 가능)
- 응답 인터셉터: 공통 에러 처리

### `styles/global.css`
- CSS reset (box-sizing, margin, padding 초기화)
- CSS 커스텀 변수 (색상, 폰트, 간격 등 기본값)

### `App.tsx`
- `BrowserRouter` + `Routes` + `Route` 설정
- 초기 라우트: `/` → `HomePage`

### `pages/HomePage`
- 동작 확인용 샘플 페이지
- CSS Modules 사용 예시 포함

---

## CSS Modules 규칙

- 파일명: `컴포넌트명.module.css`
- 클래스명: camelCase (`styles.container`, `styles.headerTitle`)
- 전역 스타일은 `styles/global.css`에서만 관리

---

## 환경변수

`.env` 파일로 관리 (`.gitignore`에 포함):
```
VITE_API_BASE_URL=http://localhost:8080
```

---

## 기존 파일 처리

- `src/index.ts` — 삭제 (main.tsx로 대체)
- `tsconfig.json` — Vite + React용으로 업데이트
- `package.json` — 기존 TypeScript 전용 스크립트 → Vite 스크립트로 교체
