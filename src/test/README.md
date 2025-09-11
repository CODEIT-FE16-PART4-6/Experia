# 테스트 스크립트

이 폴더는 서버 및 로그인 기능을 테스트하는 TypeScript 스크립트들을 포함합니다.

## 파일 구조

- `server.test.ts` - 서버 기본 기능 테스트
- `login.test.ts` - 로그인 기능 상세 테스트
- `run-server-test.ts` - 서버 테스트 실행 스크립트
- `run-login-test.ts` - 로그인 테스트 실행 스크립트

## 사용법

### 1. npm 스크립트 사용 (권장)

```bash
# 서버 기본 기능 테스트
npm run test:server

# 로그인 기능 테스트
npm run test:login
```

### 2. 직접 실행

```bash
# tsx를 사용하여 직접 실행
npx tsx src/test/run-server-test.ts
npx tsx src/test/run-login-test.ts
```

## 테스트 환경

- **포트**: 3001 (`http://localhost:3001`)
- **테스트 계정**: `aa@aa.com` / `123123123`

## 사전 요구사항

1. 개발 서버가 실행 중이어야 합니다:

   ```bash
   npm run dev
   ```

2. `tsx` 패키지가 필요합니다 (이미 설치되어 있음):
   ```bash
   npm install -g tsx
   ```

## 테스트 내용

### 서버 테스트 (`server.test.ts`)

- 서버 실행 상태 확인
- 로그인 페이지 접근 테스트
- 보호된 페이지 리다이렉트 확인
- API 엔드포인트 응답 테스트

### 로그인 테스트 (`login.test.ts`)

- `aa@aa.com` / `123123123` 계정으로 로그인 테스트
- 로그인 성공 후 보호된 페이지 접근 테스트
- 쿠키 기반 인증 시스템 검증

## 주의사항

- 테스트 실행 전에 반드시 개발 서버(`npm run dev`)가 실행 중인지 확인하세요.
- 포트 3001에서 서버가 실행되어야 합니다.
- 테스트는 실제 API 서버와 통신하므로 네트워크 연결이 필요합니다.
