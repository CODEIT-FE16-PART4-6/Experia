#!/bin/bash

# 개발 환경 자동 설정 스크립트

echo "🚀 Experia 개발 환경 설정을 시작합니다..."

# 1. 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# 2. Husky 설정
echo "🪝 Git 훅 설정 중..."
npm run prepare

# 2-1. Git 설정 강화
echo "⚙️  Git 설정 강화 중..."
git config core.hooksPath .husky
git config core.autocrlf input

# 2-2. 훅 권한 설정
echo "🔑 훅 권한 설정 중..."
chmod +x .husky/*

# 3. VS Code 확장 프로그램 설치 (VS Code가 설치된 경우)
if command -v code &> /dev/null; then
    echo "🔧 VS Code 확장 프로그램 설치 중..."
    code --install-extension esbenp.prettier-vscode
    code --install-extension dbaeumer.vscode-eslint
    code --install-extension bradlc.vscode-tailwindcss
    code --install-extension ms-vscode.vscode-typescript-next
    code --install-extension formulahendry.auto-rename-tag
    code --install-extension christian-kohler.path-intellisense
    echo "✅ VS Code 확장 프로그램 설치 완료"
else
    echo "⚠️  VS Code가 설치되지 않았습니다. 수동으로 확장 프로그램을 설치해주세요."
fi

# 4. 린트 및 포맷팅 검사
echo "🔍 코드 품질 검사 중..."
if npm run lint; then
    echo "✅ ESLint 검사 통과"
else
    echo "⚠️  ESLint 오류가 있습니다. 'npm run lint -- --fix'로 수정해주세요."
fi

if npx prettier --check .; then
    echo "✅ Prettier 포맷팅 검사 통과"
else
    echo "⚠️  포맷팅 오류가 있습니다. 'npx prettier --write .'로 수정해주세요."
fi

# 5. 타입 체크
echo "🔍 TypeScript 타입 체크 중..."
if npx tsc --noEmit; then
    echo "✅ TypeScript 타입 체크 통과"
else
    echo "⚠️  TypeScript 타입 오류가 있습니다."
fi

# 6. 프로덕션 빌드 테스트
echo "🏗️  프로덕션 빌드 테스트 중..."
echo "🧹 개발용 의존성 정리 중..."
npm prune --omit=dev

if npm run build; then
    echo "✅ 프로덕션 빌드 테스트 통과"
else
    echo "❌ 프로덕션 빌드 실패했습니다."
    echo "🔄 개발용 의존성 복원 중..."
    npm install
    exit 1
fi

# 7. 개발용 의존성 복원
echo "🔄 개발용 의존성 복원 중..."
npm install

# 8. 번들 분석 도구 설치
echo "📊 번들 분석 도구 설치 중..."
npm install --save-dev @next/bundle-analyzer

echo ""
echo "🎉 개발 환경 설정이 완료되었습니다!"
echo ""
echo "📋 다음 단계:"
echo "1. VS Code에서 프로젝트를 열어주세요"
echo "2. 자동으로 추천되는 확장 프로그램을 설치해주세요"
echo "3. 코드 작업을 시작하세요 - 저장시 자동으로 포맷팅됩니다!"
echo ""
echo "🔧 유용한 명령어들:"
echo "  - 번들 분석: npm run analyze"
echo "  - 서버 번들 분석: npm run analyze:server"
echo "  - 브라우저 번들 분석: npm run analyze:browser"
echo ""
echo "📖 자세한 내용은 docs/development-setup.md를 참고하세요."
