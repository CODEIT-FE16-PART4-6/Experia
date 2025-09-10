#!/bin/bash

# AI 코드 리뷰 시스템 설정 스크립트

echo "🚀 AI 코드 리뷰 시스템 설정을 시작합니다..."

# 1. 환경 변수 설정 확인
echo "📋 환경 변수 설정을 확인합니다..."

if [ -f ".env.local" ]; then
    echo "✅ .env.local 파일이 존재합니다."
else
    echo "📝 .env.local 파일을 생성합니다..."
    cat > .env.local << EOF
# AI 리뷰 설정
AI_REVIEW=true
REVIEW_TIMEOUT=300000
MAX_DIFF_SIZE=1000

# 기타 설정
NEXT_PUBLIC_API_URL=https://sp-globalnomad-api.vercel.app/16-6
EOF
    echo "✅ .env.local 파일이 생성되었습니다."
fi

# 2. Git 설정 확인
echo "📋 Git 설정을 확인합니다..."

if git config --get user.name > /dev/null 2>&1; then
    echo "✅ Git 사용자명이 설정되어 있습니다: $(git config --get user.name)"
else
    echo "⚠️  Git 사용자명이 설정되지 않았습니다."
    echo "다음 명령어로 설정해주세요:"
    echo "git config --global user.name 'Your Name'"
fi

if git config --get user.email > /dev/null 2>&1; then
    echo "✅ Git 이메일이 설정되어 있습니다: $(git config --get user.email)"
else
    echo "⚠️  Git 이메일이 설정되지 않았습니다."
    echo "다음 명령어로 설정해주세요:"
    echo "git config --global user.email 'your.email@example.com'"
fi

# 3. Husky 설정 확인
echo "📋 Husky 설정을 확인합니다..."

if [ -d ".husky" ]; then
    echo "✅ Husky 디렉토리가 존재합니다."
    if [ -f ".husky/pre-commit" ]; then
        echo "✅ pre-commit 훅이 설정되어 있습니다."
    else
        echo "❌ pre-commit 훅이 설정되지 않았습니다."
    fi
else
    echo "❌ Husky가 설정되지 않았습니다."
fi

# 4. Cursor Rules 확인
echo "📋 Cursor Rules 설정을 확인합니다..."

if [ -f ".cursorrules" ]; then
    echo "✅ .cursorrules 파일이 존재합니다."
else
    echo "❌ .cursorrules 파일이 존재하지 않습니다."
fi

# 5. AI 리뷰 스크립트 확인
echo "📋 AI 리뷰 스크립트를 확인합니다..."

if [ -f "scripts/ai-review.js" ]; then
    echo "✅ AI 리뷰 스크립트가 존재합니다."
    if [ -x "scripts/ai-review.js" ]; then
        echo "✅ AI 리뷰 스크립트가 실행 가능합니다."
    else
        echo "⚠️  AI 리뷰 스크립트에 실행 권한을 부여합니다..."
        chmod +x scripts/ai-review.js
    fi
else
    echo "❌ AI 리뷰 스크립트가 존재하지 않습니다."
fi

# 6. 테스트 실행
echo "📋 시스템 테스트를 실행합니다..."

echo "🧪 lint-staged 테스트..."
if npx lint-staged --dry-run > /dev/null 2>&1; then
    echo "✅ lint-staged가 정상적으로 작동합니다."
else
    echo "⚠️  lint-staged에 문제가 있을 수 있습니다."
fi

echo "🧪 AI 리뷰 스크립트 테스트..."
if node scripts/ai-review.js --help > /dev/null 2>&1; then
    echo "✅ AI 리뷰 스크립트가 정상적으로 작동합니다."
else
    echo "⚠️  AI 리뷰 스크립트에 문제가 있을 수 있습니다."
fi

# 7. 사용법 안내
echo ""
echo "🎉 AI 코드 리뷰 시스템 설정이 완료되었습니다!"
echo ""
echo "📖 사용법:"
echo "1. 일반 커밋 (AI 리뷰 없음):"
echo "   git add . && git commit -m 'feat: 새 기능'"
echo ""
echo "2. AI 리뷰와 함께 커밋:"
echo "   git add . && AI_REVIEW=true git commit -m 'feat: 새 기능'"
echo "   또는"
echo "   npm run commit -m 'feat: 새 기능'"
echo ""
echo "3. AI 리뷰만 실행:"
echo "   npm run ai-review"
echo ""
echo "🔧 환경 변수 설정:"
echo "- AI_REVIEW=true: AI 리뷰 활성화"
echo "- REVIEW_TIMEOUT=300000: 리뷰 대기 시간 (밀리초)"
echo "- MAX_DIFF_SIZE=1000: 최대 변경사항 크기 (줄 수)"
echo ""
echo "📝 Cursor Rules 수정:"
echo "- .cursorrules 파일을 편집하여 팀 규칙을 수정할 수 있습니다."
echo ""
echo "🚨 문제 해결:"
echo "- AI 리뷰가 작동하지 않으면 환경 변수를 확인해주세요."
echo "- Cursor가 설치되어 있고 .cursorrules 파일이 있는지 확인해주세요."
echo ""
echo "✨ 즐거운 코딩 되세요!"
