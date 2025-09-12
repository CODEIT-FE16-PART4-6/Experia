#!/bin/bash

# Husky 훅 강제 복원 스크립트

echo "🔧 Husky 훅 복원 중..."

# 1. Husky 재설치
echo "📦 Husky 재설치 중..."
npm install husky --save-dev

# 2. Husky 초기화
echo "🪝 Husky 초기화 중..."
npx husky init

# 3. 훅 파일들 복사 (백업에서 복원)
echo "📋 훅 파일들 복원 중..."

# pre-commit 훅 복원
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Pre-commit 훅 실행 중..."

# lint-staged 실행 (오류 발생시 커밋 차단)
echo "📝 코드 포맷팅 및 린트 검사..."
if ! npx lint-staged; then
  echo "❌ 린트 또는 포맷팅 오류가 발견되어 커밋이 차단되었습니다."
  echo "🔧 다음 명령어로 문제를 해결하세요:"
  echo "   npm run lint -- --fix"
  echo "   npx prettier --write ."
  exit 1
fi

# AI 리뷰 실행 (환경 변수가 설정된 경우에만)
if [ "$AI_REVIEW" = "true" ]; then
  echo "🤖 AI 리뷰를 시작합니다..."
  if ! node scripts/ai-review.js; then
    echo "❌ AI 리뷰에서 문제가 발견되어 커밋이 차단되었습니다."
    exit 1
  fi
elif [ "$OPENAI_REVIEW" = "true" ]; then
  echo "🤖 OpenAI AI 리뷰를 시작합니다..."
  if ! node scripts/ai-review-openai.js; then
    echo "❌ OpenAI AI 리뷰에서 문제가 발견되어 커밋이 차단되었습니다."
    exit 1
  fi
else
  echo "ℹ️  AI 리뷰를 건너뜁니다. (AI 리뷰를 원하면 AI_REVIEW=true 또는 OPENAI_REVIEW=true로 설정하세요)"
fi

echo "✅ Pre-commit 훅 완료"
EOF

# pre-push 훅 복원
cat > .husky/pre-push << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Pre-push 훅 실행 중..."

# TypeScript 타입 체크
echo "🔍 TypeScript 타입 체크..."
if ! npx tsc --noEmit; then
  echo "❌ TypeScript 타입 오류가 발견되어 푸시가 차단되었습니다."
  exit 1
fi

# 전체 프로젝트 린트 검사
echo "📝 전체 프로젝트 린트 검사..."
if ! npm run lint; then
  echo "❌ 린트 오류가 발견되어 푸시가 차단되었습니다."
  echo "🔧 다음 명령어로 문제를 해결하세요:"
  echo "   npm run lint -- --fix"
  exit 1
fi

# 개발용 의존성 정리 (프로덕션 환경과 동일하게)
echo "🧹 개발용 의존성 정리 중..."
npm prune --omit=dev

# 빌드 테스트 (프로덕션 환경과 동일한 의존성으로 빌드)
echo "🏗️  프로덕션 빌드 테스트..."
if ! npm run build; then
  echo "❌ 프로덕션 빌드 실패로 인해 푸시가 차단되었습니다."
  echo "🔧 개발용 의존성을 다시 설치하려면: npm install"
  exit 1
fi

# 개발용 의존성 복원
echo "🔄 개발용 의존성 복원 중..."
npm install

echo "✅ Pre-push 훅 완료 - 모든 검사 통과"
EOF

# prepare-commit-msg 훅 복원
cat > .husky/prepare-commit-msg << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 현재 브랜치 이름 가져오기 (예: feat/P6-123 -> P6-123)
BRANCH_NAME=$(git branch --show-current) # 현재 브랜치명을 가져옴
BRANCH_NAME="${BRANCH_NAME##*/}" # / 부분을 기준으로 앞 부분을 제거

# 브랜치 이름에서 JIRA 이슈 키 추출 (예: feat/P6-123 -> P6-123)
# 대소문자 구분없이 추출하고 대문자로 변환하기
JIRA_ISSUE_KEY=$(echo "$BRANCH_NAME" | grep -oEi 'p6-[0-9]+' | tr 'a-z' 'A-Z')

# 커밋 메시지 파일 경로
COMMIT_MSG_FILE=$1

# 커밋 메시지에 이슈 키가 이미 포함되어 있는지 확인 (예: [P6-123] ...)
BRANCH_IN_COMMIT=$(grep -c "\[$JIRA_ISSUE_KEY\]" "$COMMIT_MSG_FILE")

# 지라 이슈 키가 존재하고, 커밋 메시지에 아직 포함되지 않았다면 커밋 메시지 첫 줄 맨 앞에 "[이슈키] " 추가
if [ -n "$JIRA_ISSUE_KEY" ] && [ "$BRANCH_IN_COMMIT" -eq 0 ]; then
  sed -i.bak -e "1s/^/[$JIRA_ISSUE_KEY] /" "$COMMIT_MSG_FILE"
fi
EOF

# 4. 실행 권한 부여
echo "🔑 실행 권한 부여 중..."
chmod +x .husky/*

# 5. Git 훅 확인
echo "✅ Git 훅 확인 중..."
if [ -d ".git/hooks" ]; then
    echo "📁 Git 훅 디렉토리 존재 확인"
    ls -la .git/hooks/ | grep -E "(pre-commit|pre-push|prepare-commit-msg)"
else
    echo "❌ Git 훅 디렉토리를 찾을 수 없습니다."
fi

echo ""
echo "🎉 Husky 훅 복원 완료!"
echo ""
echo "📋 복원된 훅들:"
echo "  - pre-commit: 린트/포맷팅 검사 + AI 리뷰"
echo "  - pre-push: 타입 체크 + 린트 + 프로덕션 빌드 테스트"
echo "  - prepare-commit-msg: JIRA 이슈 키 자동 추가"
echo ""
echo "🔧 훅이 여전히 작동하지 않으면 다음을 시도하세요:"
echo "  - git config core.hooksPath .husky"
echo "  - 또는 이 스크립트를 다시 실행하세요"
