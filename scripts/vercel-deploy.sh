#!/bin/bash

# Vercel 배포 스크립트
# 사용법: ./scripts/vercel-deploy.sh [environment]

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 환경 변수 설정
ENVIRONMENT=${1:-development}
PROJECT_NAME="experia"
BRANCH_NAME="dev"

# 환경별 설정
case $ENVIRONMENT in
    "development"|"dev")
        ENVIRONMENT="development"
        BRANCH_NAME="dev"
        DOMAIN_SUFFIX="dev"
        ;;
    "staging"|"stage")
        ENVIRONMENT="staging"
        BRANCH_NAME="P6-158-vercel"
        DOMAIN_SUFFIX="staging"
        ;;
    "production"|"prod")
        ENVIRONMENT="production"
        BRANCH_NAME="main"
        DOMAIN_SUFFIX="prod"
        ;;
    *)
        log_error "지원하지 않는 환경입니다: $ENVIRONMENT"
        log_info "사용 가능한 환경: development, staging, production"
        exit 1
        ;;
esac

log_info "Vercel 배포 시작 - 환경: $ENVIRONMENT, 브랜치: $BRANCH_NAME"

# 현재 브랜치 확인
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$BRANCH_NAME" ]; then
    log_warning "현재 브랜치($CURRENT_BRANCH)가 대상 브랜치($BRANCH_NAME)와 다릅니다."
    read -p "브랜치를 전환하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "브랜치 전환 중: $BRANCH_NAME"
        git checkout $BRANCH_NAME
    else
        log_error "배포를 취소합니다."
        exit 1
    fi
fi

# 최신 상태로 업데이트
log_info "최신 상태로 업데이트 중..."
git fetch origin
git pull origin $BRANCH_NAME

# Vercel CLI 설치 확인
if ! command -v vercel &> /dev/null; then
    log_warning "Vercel CLI가 설치되지 않았습니다."
    log_info "Vercel CLI 설치 중..."
    npm install -g vercel
fi

# Vercel 로그인 확인
if ! vercel whoami &> /dev/null; then
    log_warning "Vercel에 로그인되지 않았습니다."
    log_info "Vercel 로그인 중..."
    vercel login
fi

# 프로젝트 설정 확인
log_info "Vercel 프로젝트 설정 확인 중..."
if ! vercel project ls | grep -q "$PROJECT_NAME"; then
    log_warning "Vercel 프로젝트가 설정되지 않았습니다."
    log_info "프로젝트 연결 중..."
    vercel link
fi

# 환경변수 설정
log_info "환경변수 설정 중..."
case $ENVIRONMENT in
    "development")
        vercel env add NEXT_PUBLIC_BACKEND_URL development <<< "https://sp-globalnomad-api.vercel.app" || true
        vercel env add NEXT_PUBLIC_TEAM development <<< "16-6" || true
        vercel env add NODE_ENV development <<< "development" || true
        ;;
    "staging")
        vercel env add NEXT_PUBLIC_BACKEND_URL preview <<< "https://sp-globalnomad-api.vercel.app" || true
        vercel env add NEXT_PUBLIC_TEAM preview <<< "16-6" || true
        vercel env add NODE_ENV preview <<< "staging" || true
        ;;
    "production")
        vercel env add NEXT_PUBLIC_BACKEND_URL production <<< "https://sp-globalnomad-api.vercel.app" || true
        vercel env add NEXT_PUBLIC_TEAM production <<< "16-6" || true
        vercel env add NODE_ENV production <<< "production" || true
        ;;
esac

# 배포 실행
log_info "Vercel 배포 실행 중..."
if [ "$ENVIRONMENT" = "production" ]; then
    vercel --prod
else
    vercel
fi

# 배포 결과 확인
if [ $? -eq 0 ]; then
    log_success "배포가 성공적으로 완료되었습니다!"
    
    # 배포 URL 확인
    DEPLOYMENT_URL=$(vercel ls --json | jq -r '.[0].url' 2>/dev/null || echo "배포 URL을 확인할 수 없습니다.")
    log_info "배포 URL: https://$DEPLOYMENT_URL"
    
    # 환경별 추가 정보
    case $ENVIRONMENT in
        "development")
            log_info "개발 환경 배포 완료"
            log_info "Vercel 대시보드: https://vercel.com/dashboard"
            ;;
        "staging")
            log_info "스테이징 환경 배포 완료"
            log_info "테스트 URL: https://$DEPLOYMENT_URL"
            ;;
        "production")
            log_info "프로덕션 환경 배포 완료"
            log_warning "프로덕션 배포는 신중하게 진행하세요!"
            ;;
    esac
else
    log_error "배포가 실패했습니다."
    log_info "배포 로그를 확인하세요: vercel logs"
    exit 1
fi

# 배포 후 정리
log_info "배포 후 정리 중..."
vercel ls

log_success "Vercel 배포 프로세스 완료!"
