# 개발 환경 설정 가이드

## 필수 도구 설치

### 1. VS Code 확장 프로그램

프로젝트를 열면 자동으로 다음 확장 프로그램이 추천됩니다:

- **Prettier** (esbenp.prettier-vscode): 코드 포맷팅
- **ESLint** (dbaeumer.vscode-eslint): 코드 린팅
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss): Tailwind CSS 자동완성
- **TypeScript Importer** (pmneo.tsimporter): TypeScript import 자동화

### 2. Node.js 및 패키지 설치

```bash
# Node.js 20.x 설치 확인
node --version

# 프로젝트 의존성 설치
npm install

# Husky 설정 (Git 훅 설정)
npm run prepare
```

## 개발 환경 설정

### VS Code 설정

프로젝트에 포함된 `.vscode/settings.json`이 자동으로 다음을 설정합니다:

- **저장시 자동 포맷팅**: 파일 저장시 Prettier로 자동 포맷팅
- **저장시 자동 린트 수정**: ESLint 오류 자동 수정
- **Import 자동 정렬**: 저장시 import 문 자동 정렬
- **파일 종료시 새 줄 추가**: 파일 끝에 새 줄 자동 추가

### Git 훅 설정

Husky가 다음 훅들을 자동 설정합니다:

#### Pre-commit 훅

- **lint-staged 실행**: 스테이징된 파일에 대해 ESLint + Prettier 실행
- **오류시 커밋 차단**: 린트 또는 포맷팅 오류 발견시 커밋 차단

#### Pre-push 훅

- **TypeScript 타입 체크**: 타입 오류 검사
- **전체 프로젝트 린트**: 모든 파일에 대해 ESLint 검사
- **빌드 테스트**: 프로젝트 빌드 가능성 검증

## 코드 품질 규칙

### ESLint 규칙 (강제)

- ❌ `any` 타입 사용 금지
- ❌ `console.log` 사용시 경고
- ❌ `debugger` 사용 금지
- ❌ `var` 사용 금지
- ✅ `const` 사용 강제
- ✅ Import 순서 자동 정렬
- ✅ Prettier 규칙 통합

### Prettier 설정

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
```

## 개발 워크플로우

### 1. 브랜치 생성 및 작업

```bash
# 새 기능 브랜치 생성
git checkout -b feature/new-feature

# 작업 후 스테이징
git add .
```

### 2. 커밋 전 자동 검사

```bash
# 커밋 시 자동으로 실행되는 검사들:
# - lint-staged (ESLint + Prettier)
# - TypeScript 타입 체크
# - 빌드 테스트
git commit -m "feat: 새로운 기능 추가"
```

### 3. 푸시 전 추가 검사

```bash
# 푸시 시 자동으로 실행되는 검사들:
# - 전체 프로젝트 린트
# - 빌드 테스트
# - 타입 체크
git push origin feature/new-feature
```

## 문제 해결

### 린트 오류 수정

```bash
# 자동 수정 가능한 ESLint 오류 수정
npm run lint -- --fix

# Prettier 포맷팅 적용
npx prettier --write .
```

### 타입 오류 수정

```bash
# TypeScript 타입 체크
npx tsc --noEmit
```

### 빌드 오류 수정

```bash
# 프로덕션 빌드 테스트
npm run build
```

### Git 훅 우회 (비상시만)

```bash
# Pre-commit 훅 우회 (권장하지 않음)
git commit --no-verify -m "emergency fix"

# Pre-push 훅 우회 (권장하지 않음)
git push --no-verify
```

## CI/CD 파이프라인

GitHub Actions가 다음을 자동 검사합니다:

- **Pull Request**: 린트, 포맷팅, 타입 체크, 빌드, 테스트
- **Push to dev/main**: 동일한 검사들 실행

검사 실패시 PR이 머지되지 않습니다.

## 추가 도구

### 개발 서버 실행

```bash
npm run dev
```

### 테스트 실행

```bash
npm test
```

### AI 리뷰 (선택사항)

```bash
# AI 리뷰와 함께 커밋
npm run commit:ai
```

## 문제가 있나요?

1. **VS Code 확장 프로그램이 작동하지 않는 경우**: VS Code 재시작
2. **Git 훅이 실행되지 않는 경우**: `npm run prepare` 재실행
3. **의존성 오류**: `rm -rf node_modules package-lock.json && npm install`
4. **타입 오류**: `npx tsc --noEmit`로 상세 오류 확인

더 자세한 도움이 필요하면 팀원들에게 문의하세요! 🚀
