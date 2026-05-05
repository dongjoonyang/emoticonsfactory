# Comment API Integration Design

**Date:** 2026-05-05
**Scope:** 댓글 등록(POST) + 목록 조회(GET) 프론트-백엔드 연동

---

## 목표

현재 `WhatFriendsSay.tsx`는 로컬 state만 사용해서 새로고침 시 데이터가 사라진다.
서버 API와 연결해 댓글이 DB에 저장되고, 페이지 로드 시 서버에서 불러오도록 한다.

---

## 범위

- **포함:** 댓글 등록(POST), 목록 조회(GET)
- **제외:** 삭제(DELETE), 수정(PUT) — 별도 작업으로 진행

---

## 파일 변경 목록

### 신규: `frontend/src/shared/api/comments.ts`

기존 `shared/api/client.ts`의 axios 인스턴스를 사용하는 API 함수 모음.

```ts
// 댓글 타입
interface CommentResponse {
  id: number;
  author: string;
  content: string;
  date: string;
}

// GET /api/comments
getComments(): Promise<CommentResponse[]>

// POST /api/comments
createComment(author: string, password: string, content: string): Promise<CommentResponse>
```

### 수정: `frontend/src/pages/MiniroomPage/components/WhatFriendsSay.tsx`

| 항목 | 변경 내용 |
|------|-----------|
| `INITIAL_COMMENTS` | 제거 |
| 마운트 시 | `useEffect`로 `getComments()` 호출 → state 저장 |
| `handleSubmit` | `createComment()` 호출 → 응답을 state에 추가 |
| 로딩 상태 | 조회 중 버튼 비활성화 또는 간단한 표시 |

---

## 데이터 흐름

```
페이지 로드
  └─ useEffect → getComments() → GET /api/comments
       └─ 응답 댓글 목록 → setComments() → 화면 렌더링

작성 버튼 클릭
  └─ createComment(author, password, content) → POST /api/comments
       └─ 응답 댓글 1개 → setComments(prev => [...prev, newComment])
```

---

## 백엔드 API (기존 구현, 변경 없음)

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/api/comments` | 전체 댓글 목록 반환 |
| POST | `/api/comments` | 댓글 생성, 생성된 댓글 반환 |

요청 바디 (POST):
```json
{ "author": "일촌명", "password": "1234", "content": "이야기" }
```

응답:
```json
{ "id": 1, "author": "일촌명", "content": "이야기", "date": "2026-05-05" }
```
