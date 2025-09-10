#!/bin/bash

# Production 빌드 테스트 스크립트
# 이 스크립트는 Production Distroless 이미지 빌드를 테스트합니다.

echo "🚀 Production Distroless 빌드 테스트 시작..."

# Docker가 설치되어 있는지 확인
if ! command -v docker &> /dev/null; then
    echo "❌ Docker가 설치되어 있지 않습니다."
    echo "Docker를 설치한 후 다시 실행해주세요."
    exit 1
fi

# 환경변수 설정
export NEXT_PUBLIC_BACKEND_URL="https://api.experia.com"
export NEXT_PUBLIC_TEAM="production"

echo "📦 Production 이미지 빌드 중..."
docker build \
  -f Dockerfile.production \
  -t experia-production:test \
  --build-arg NEXT_PUBLIC_BACKEND_URL="$NEXT_PUBLIC_BACKEND_URL" \
  --build-arg NEXT_PUBLIC_TEAM="$NEXT_PUBLIC_TEAM" \
  .

if [ $? -eq 0 ]; then
    echo "✅ Production 이미지 빌드 성공!"
    
    # 이미지 크기 확인
    echo "📊 이미지 크기:"
    docker images experia-production:test --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
    
    # 컨테이너 실행 테스트
    echo "🧪 컨테이너 실행 테스트..."
    docker run -d -p 3001:3000 --name experia-production-test experia-production:test
    
    # 5초 대기
    sleep 5
    
    # 컨테이너 상태 확인
    if docker ps | grep -q experia-production-test; then
        echo "✅ 컨테이너 실행 성공!"
        echo "🌐 테스트 URL: http://localhost:3001"
        
        # 컨테이너 정리
        echo "🧹 테스트 컨테이너 정리 중..."
        docker stop experia-production-test
        docker rm experia-production-test
    else
        echo "❌ 컨테이너 실행 실패"
        docker logs experia-production-test
        docker rm experia-production-test
        exit 1
    fi
    
    echo "🎉 Production Distroless 빌드 테스트 완료!"
else
    echo "❌ Production 이미지 빌드 실패"
    exit 1
fi
