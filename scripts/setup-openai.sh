#!/bin/bash

# OpenAI API 설정 스크립트

echo "🤖 OpenAI 리뷰 설정을 시작합니다..."

# 1. .env 파일 존재 확인
if [ -f ".env" ]; then
    echo "📄 기존 .env 파일을 발견했습니다."
    read -p "덮어쓰시겠습니까? (y/N): " overwrite
    if [[ ! $overwrite =~ ^[Yy]$ ]]; then
        echo "❌ 설정을 취소했습니다."
        exit 0
    fi
fi

# 2. API 키 입력 받기
echo ""
echo "🔑 OpenAI API 키를 입력하세요:"
echo "   (https://platform.openai.com/api-keys 에서 발급받으세요)"
read -p "API Key: " api_key

if [ -z "$api_key" ]; then
    echo "❌ API 키가 입력되지 않았습니다."
    exit 1
fi

# 3. 모델 선택
echo ""
echo "🧠 사용할 모델을 선택하세요:"
echo "1) gpt-4 (고품질, 비쌈)"
echo "2) gpt-3.5-turbo (빠름, 저렴)"
read -p "선택 (1-2): " model_choice

case $model_choice in
    1)
        model="gpt-4"
        ;;
    2)
        model="gpt-3.5-turbo"
        ;;
    *)
        model="gpt-4"
        echo "기본값 gpt-4를 사용합니다."
        ;;
esac

# 4. .env 파일 생성
echo ""
echo "📝 .env 파일을 생성합니다..."
cat > .env << EOF
# OpenAI API 설정
OPENAI_API_KEY=$api_key
OPENAI_MODEL=$model

# AI 리뷰 설정
AI_REVIEW_ENABLED=true
AI_REVIEW_STRICT_MODE=false
EOF

# 5. 환경 변수 테스트
echo "🧪 설정을 테스트합니다..."
export OPENAI_API_KEY="$api_key"
export OPENAI_MODEL="$model"

# 6. API 연결 테스트
echo "🔍 OpenAI API 연결을 테스트합니다..."
if node -e "
const https = require('https');
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.log('❌ API 키가 설정되지 않았습니다.');
  process.exit(1);
}
console.log('✅ API 키가 설정되었습니다.');
console.log('📊 모델: ' + (process.env.OPENAI_MODEL || 'gpt-4'));
"; then
    echo "✅ OpenAI 설정이 완료되었습니다!"
else
    echo "❌ 설정에 문제가 있습니다."
    exit 1
fi

# 7. 사용법 안내
echo ""
echo "🎉 OpenAI 리뷰 설정 완료!"
echo ""
echo "📋 사용 방법:"
echo "  - AI 리뷰와 함께 커밋: npm run commit:ai:openai"
echo "  - 직접 AI 리뷰 실행: node scripts/ai-review-openai.js"
echo ""
echo "💡 팁:"
echo "  - API 키 없이도 기본 리뷰는 작동합니다"
echo "  - .env 파일은 Git에 커밋되지 않습니다"
echo "  - 비용 절약을 위해 gpt-3.5-turbo도 사용 가능합니다"
echo ""
echo "📖 자세한 내용은 docs/openai-setup.md를 참고하세요."
