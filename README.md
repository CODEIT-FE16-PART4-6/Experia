<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Permanent+Marker&size=40&duration=1500&pause=1000&color=105541&center=true&multiline=true&width=466&height=101&lines=%22Experia%22;Explorer+the+area)](https://git.io/typing-svg)
<br>
[![Typing SVG](https://readme-typing-svg.demolab.com?font=Do+Hyeon&size=30&duration=1500&pause=1000&color=339769&center=true&multiline=true&width=435&lines=%EA%B9%80%EC%9D%B4%EC%84%9C+%EC%9D%B4%EC%83%81%EB%8B%AC+%EC%9D%B4%ED%98%95%ED%83%81+%EC%B5%9C%EB%AF%BC%EC%A4%80+%EC%B5%9C%EC%9E%AC%ED%98%B8)](https://git.io/typing-svg)

<img src="https://img.shields.io/badge/next.js-%23000000.svg?&style=for-the-badge&logo=next.js&logoColor=white" /> <img src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/tailwind%20css-%2338B2AC.svg?&style=for-the-badge&logo=tailwind%20css&logoColor=white" /> <img src="https://img.shields.io/badge/eslint-%234B32C3.svg?&style=for-the-badge&logo=eslint&logoColor=white" /> <br><img src="https://img.shields.io/badge/prettier-%23F7B93E.svg?&style=for-the-badge&logo=prettier&logoColor=black" /> <img src="https://img.shields.io/badge/jira-%230052CC.svg?&style=for-the-badge&logo=jira&logoColor=white" /> <img src="https://img.shields.io/badge/notion-%23000000.svg?&style=for-the-badge&logo=notion&logoColor=white" /> <img src="https://img.shields.io/badge/amazon%20aws-%23232F3E.svg?&style=for-the-badge&logo=amazon%20aws&logoColor=white" /> <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white" />

<div align="left">

## 📖 프로젝트 소개

**Experia**는 지역 체험 활동을 예약하고 관리할 수 있는 B2C 플랫폼입니다. 사용자들이 다양한 체험 활동을 쉽게 찾고 예약할 수 있으며, 호스트는 자신의 체험을 등록하고 관리할 수 있습니다.

### 🎯 주요 기능

- **🎪 체험 활동 관리**: 문화·예술, 식음료, 스포츠, 투어, 관광, 웰빙 등 6개 카테고리
- **📅 캘린더 기반 예약**: 실시간 예약 현황 및 일정 관리
- **🗺️ 지도 연동**: Leaflet + OpenStreetMap API를 활용한 위치 표시
- **⭐ 리뷰 시스템**: 5점 만점 평점 및 리뷰 작성
- **👤 사용자 관리**: 회원가입, 로그인, 프로필 관리
- **🔔 알림 시스템**: 예약 상태 변경 알림
- **📱 반응형 디자인**: 모바일 우선 반응형 UI

### 🚀 기술 스택

#### Frontend

- **Next.js 15.5.3** (App Router)
- **React 19.1.0**
- **TypeScript 5.9.2**
- **Tailwind CSS 4.0**

#### 상태 관리 & 데이터 페칭

- **Zustand** (전역 상태 관리)
- **React Query** (서버 상태 관리)
- **React Hook Form** (폼 관리)

#### 외부 API & 라이브러리

- **Leaflet** (지도)
- **PhotoSwipe** (이미지 갤러리)
- **Zod** (데이터 검증)
- **date-fns** (날짜 처리)

#### 개발 도구

- **ESLint** (코드 품질)
- **Prettier** (코드 포맷팅)
- **Husky** (Git Hooks)
- **Jest** (테스트)

## 🛠️ Installation

### 환경 요구사항

- Node.js >= 22.18.0
- npm >= 10.0.0

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/ExplorerTheArea/Experia.git
cd Experia

# 의존성 설치
npm install

# 환경 변수 설정 (기본값으로 설정됨)
cp .exampleEnv .env
```

### 환경 변수 설정

```bash
# .env 파일 수정
NEXT_PUBLIC_BACKEND_URL=https://sp-globalnomad-api.vercel.app
NEXT_PUBLIC_TEAM=16-6
NEXT_PUBLIC_KAKAO_APP_KEY=카카오 API키 (선택사항)
NEXT_PUBLIC_KAKAO_REDIRECT_URI=카카오 리다이렉트 URL (선택사항)
```

> **💡 참고**: 백엔드 API는 공개되어 있어 바로 사용 가능합니다. 카카오 로그인 기능은 선택사항이므로 API 키 없이도 기본 기능을 사용할 수 있습니다.

### 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

이제 http://localhost:3000 에서 Experia를 확인할 수 있습니다! 🎉

### 🌐 라이브 데모

프로젝트를 직접 체험해보세요:

- **개발 환경**: [Vercel Dev](https://experia-jet.vercel.app/) (dev 브랜치)
- **프로덕션**: [AWS Production](https://experia.click/) (main 브랜치)

> **💡 팁**: 로컬에서 실행하기 전에 라이브 데모를 먼저 확인해보세요!

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (global)/          # 전역 페이지
│   └── api/               # API 라우트
├── components/            # 재사용 가능한 컴포넌트
│   ├── activities/        # 체험 관련 컴포넌트
│   ├── calender/          # 캘린더 컴포넌트
│   ├── form/              # 폼 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── ui/                # 기본 UI 컴포넌트
├── hooks/                 # 커스텀 훅
├── stores/                # Zustand 상태 관리
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수
└── constants/             # 상수 정의
```

## 🎨 주요 기능 상세

### 📅 캘린더 시스템

- **실시간 예약 현황**: 날짜별 완료/승인/대기 상태 표시
- **동적 데이터 연동**: API를 통한 실시간 예약 데이터 로드
- **사용자 친화적 UI**: 직관적인 날짜 선택 인터페이스

### 🗺️ 지도 기능

- **OpenStreetMap API**: 무료 지도 서비스 활용
- **지오코딩**: 주소 → 좌표 변환 자동화
- **동적 로딩**: SSR 방지로 성능 최적화
- **마커 표시**: 체험 위치 정확한 표시

### 🎫 예약 시스템

- **실시간 예약**: 즉시 예약 가능/불가능 상태 표시
- **인원수 조절**: 동적 가격 계산
- **일정 관리**: 날짜/시간별 예약 관리
- **상태 추적**: 예약 진행 상황 실시간 업데이트

## 🚀 성능 최적화

### 이미지 최적화

- **Next.js Image**: 자동 이미지 최적화
- **Sharp**: 이미지 압축 및 블러 처리
- **동적 로딩**: 필요시에만 이미지 로드

### 데이터 페칭 최적화

- **React Query**: 무한 스크롤 및 캐싱
- **SSR/SSG**: 서버사이드 렌더링
- **동적 Import**: 코드 스플리팅

### 번들 최적화

- **Tree Shaking**: 사용하지 않는 코드 제거
- **번들 분석**: Next.js Bundle Analyzer
- **Vercel Speed Insights**: 성능 모니터링

## 🤖 자동화된 개발 프로세스

### Git Hooks (Husky)

- **Pre-commit**: 린트 검사 + AI 코드 리뷰
- **Pre-push**: 타입 체크 + 프로덕션 빌드 테스트
- **Prepare-commit-msg**: JIRA 이슈 키 자동 추가

### AI 코드 리뷰

- **규칙 기반 검사**: 자동 코드 품질 검사
- **OpenAI 연동**: GPT-4를 활용한 고품질 리뷰
- **8가지 검사 기준**: 가독성, 예측가능성, 응집성, 결합도, 성능, 보안, 접근성, 타입안전성

### CI/CD 파이프라인

- **GitHub Actions**: 자동 빌드 및 테스트
- **Vercel**: 자동 배포
- **JIRA 연동**: 이슈 자동 생성

## 🧪 테스트

```bash
# 단위 테스트 실행
npm test

# 서버 테스트 실행
npm run test:server

# 로그인 테스트 실행
npm run test:login
```

## 📝 코드 품질 관리

### 린트 및 포맷팅

```bash
# 린트 검사
npm run lint

# 자동 수정
npm run lint -- --fix

# 포맷팅 검사
npm run format:check

# 포맷팅 적용
npm run format:write
```

### 타입 체크

```bash
# TypeScript 타입 체크
npm run type-check
```

## 🏷️ Release 관리

### 버전 태그 생성

```bash
# 릴리스 태그 생성
git tag -a v1.0.0 -m "Release v1.0.0: 초기 버전"

# 원격 저장소에 푸시
git push origin v1.0.0
```

### 현재 릴리스

- **v1.0.0**: 초기 버전 릴리스 (2024.12.19)

## 🤝 팀 협업

### 브랜치 전략

- **main**: 프로덕션 배포 브랜치
- **dev**: 개발 브랜치 (Vercel 자동 배포)
- **feature/**: 기능 개발 브랜치
- **hotfix/**: 긴급 수정 브랜치

### 커밋 규칙

```bash
# 일반 커밋
git commit -m "feat: 새 기능 추가"

# AI 리뷰와 함께 커밋
AI_REVIEW=true git commit -m "feat: 새 기능 추가"

# 대화형 커밋 도구
npm run commit:interactive
```

## 📚 문서

### 📖 프로젝트 문서

- [README-AI-REVIEW](./README-AI-REVIEW.md) - AI 코드 리뷰 시스템 가이드
- [테스트 스크립트](./src/utils/test/README.md) - 서버 및 로그인 테스트 가이드

### 🛠️ 개발 문서

- [개발 환경 설정](./docs/development-setup.md)
- [환경 변수 설정](./docs/environment-setup.md)
- [OpenAI 설정](./docs/openai-setup.md)
- [Vercel 배포](./docs/vercel-deployment.md)
- [Zod 검증 개선](./docs/zod-validation-improvements.md)

## 🐛 이슈 및 버그 리포트

버그를 발견하거나 기능 요청이 있으시면 [Issues](https://github.com/ExplorerTheArea/Experia/issues)를 통해 알려주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 팀원

- **김이서** - Frontend Developer
- **이상달** - Frontend Developer
- **이형탁** - Frontend Developer
- **최민준** - Frontend Developer
- **최재호** - Frontend Developer

---

<div align="center">
  <p>Made with ❤️ by Experia Team</p>
  <p>Explorer the area, Experience the world</p>
</div>

</div>

![Footer](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=footer)

</div>
# Production Distroless 배포 테스트 - #오후
