# ===========================================
# Stage 1: Build Stage (개발 의존성 포함)
# ===========================================
FROM node:22.18.0-alpine AS builder

# Install tzdata package
RUN apk add --no-cache tzdata

ENV TZ="Asia/Seoul"

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사 (캐시 최적화)
COPY package.json package-lock.json ./

# 모든 의존성 설치 (devDependencies 포함)
RUN npm ci --only=production=false

# 소스 코드 복사
COPY . .

# 환경변수 설정
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_TEAM
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_TEAM=$NEXT_PUBLIC_TEAM

# Next.js 빌드 실행
RUN npm run build

# ===========================================
# Stage 2: Production Stage (운영용 최적화)
# ===========================================
FROM node:22.18.0-alpine AS production

# Install tzdata package
RUN apk add --no-cache tzdata

ENV TZ="Asia/Seoul"

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package.json package-lock.json ./

# 운영용 의존성만 설치 (devDependencies 제외)
RUN npm ci --only=production && npm cache clean --force

# 빌드된 파일들을 builder stage에서 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# 불필요한 파일들 정리
RUN npm prune --omit=dev

# 포트 노출
EXPOSE 3000

# 운영용 명령어 실행
CMD ["npm", "run", "start"]
