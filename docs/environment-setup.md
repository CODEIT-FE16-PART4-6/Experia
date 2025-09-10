# 환경별 설정 가이드

## Production 환경 설정

### 1. 환경변수 설정

Production 환경에서는 다음 환경변수들을 설정해야 합니다:

```bash
# .env.production 파일 생성
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_BACKEND_URL=https://api.experia.com
NEXT_PUBLIC_TEAM=production
LOG_LEVEL=error
NEXT_PUBLIC_SECURE_COOKIES=true
NEXT_PUBLIC_HTTPS_ONLY=true
```

### 2. Docker 실행 명령어

```bash
# Production 컨테이너 실행
docker run -d \
  -p 8000:3000 \
  --name production-container \
  --restart always \
  --memory=2g \
  --cpus=2.0 \
  --env-file .env.production \
  your-image:production
```

### 3. 환경별 배포 설정

- **Development (dev 브랜치)**: Vercel 자동배포 (개발 환경)
- **Staging (P6-158-vercel 브랜치)**: Vercel 자동배포 (스테이징 환경)
- **Production (main 브랜치)**: AWS EC2 (포트 7100, 기존 도메인)

### 4. 리소스 할당

- **Development**: 메모리 1GB, CPU 1.0
- **Production**: 메모리 2GB, CPU 2.0

## 배포 전략

### 점진적 마이그레이션

1. **현재**: dev 브랜치 자동배포 유지 (Alpine 기반)
2. **추가**: main 브랜치 자동배포 설정 (Distroless 기반)
3. **테스트**: main 브랜치 배포 검증
4. **전환**: 필요시 dev → main으로 전환

### 브랜치별 역할

- **dev**: 개발 환경 (Vercel 자동배포)
- **P6-158-vercel**: 스테이징 환경 (Vercel 자동배포)
- **main**: 프로덕션 환경 (Distroless, 포트 7100)

## Vercel 배포 설정

### 1. Vercel CLI 설치 및 설정

```bash
# Vercel CLI 설치
npm install -g vercel

# Vercel 로그인
vercel login

# 프로젝트 연결
vercel link
```

### 2. 환경별 배포 명령어

```bash
# 개발 환경 배포
npm run vercel:dev

# 스테이징 환경 배포
npm run vercel:staging

# 프로덕션 환경 배포
npm run vercel:prod

# 기본 배포 (개발 환경)
npm run vercel:deploy
```

### 3. Vercel 환경변수 설정

Vercel 대시보드에서 다음 환경변수들을 설정해야 합니다:

```
NEXT_PUBLIC_BACKEND_URL = https://sp-globalnomad-api.vercel.app
NEXT_PUBLIC_TEAM = 16-6
NODE_ENV = development
```

### 4. 자동 배포 설정

- **dev 브랜치**: Push 시 자동 배포
- **P6-158-vercel 브랜치**: Push 시 자동 배포
- **main 브랜치**: GitHub Actions를 통한 AWS EC2 배포
