#!/bin/bash

# 커밋 도우미 스크립트
# AI 리뷰 여부를 선택할 수 있는 대화형 커밋 도구

echo "🚀 Experia 커밋 도우미"
echo ""

# 현재 스테이징된 파일 확인
staged_files=$(git diff --cached --name-only)
if [ -z "$staged_files" ]; then
    echo "❌ 스테이징된 파일이 없습니다."
    echo "먼저 'git add .' 명령어로 파일을 스테이징해주세요."
    exit 1
fi

echo "📋 스테이징된 파일:"
echo "$staged_files" | sed 's/^/  - /'
echo ""

# 커밋 메시지 입력
echo "💬 커밋 메시지를 입력해주세요:"
read -r commit_message

if [ -z "$commit_message" ]; then
    echo "❌ 커밋 메시지가 비어있습니다."
    exit 1
fi

echo ""
echo "🤖 AI 리뷰를 받으시겠습니까?"
echo "1) 예 - AI 리뷰와 함께 커밋 (AI_REVIEW=true)"
echo "2) 아니오 - 일반 커밋 (AI_REVIEW=false)"
echo "3) 취소"
echo ""
read -p "선택하세요 (1-3): " choice

case $choice in
    1)
        echo "🤖 AI 리뷰와 함께 커밋을 진행합니다..."
        AI_REVIEW=true git commit -m "$commit_message"
        ;;
    2)
        echo "📝 일반 커밋을 진행합니다..."
        AI_REVIEW=false git commit -m "$commit_message"
        ;;
    3)
        echo "❌ 커밋이 취소되었습니다."
        exit 0
        ;;
    *)
        echo "❌ 잘못된 선택입니다. 커밋이 취소되었습니다."
        exit 1
        ;;
esac
