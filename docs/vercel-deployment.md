# Vercel 배포 가이드

이 문서는 Experia 프로젝트의 Vercel 배포 설정 및 관리 방법을 안내합니다.

## 1. Vercel 프로젝트 설정

### **프로젝트 연결**

1. **Vercel 대시보드**: https://vercel.com/dashboard
2. **New Project** → **Import Git Repository**
3. **Repository 선택**: `CODEIT-FE16-PART4-6/Experia`
4. **Branch 선택**: `dev` (개발 환경) 또는 `P6-158-vercel` (테스트)

### **환경변수 설정**

Vercel 대시보드 → Project Settings → Environment Variables:

```
NEXT_PUBLIC_BACKEND_URL = https://api-dev.experia.com
NEXT_PUBLIC_TEAM = development
NODE_ENV = development
```

## 2. 배포 설정

### **vercel.json 구성**

```json
{
  "version": 2,
  "env": {
    "NODE_ENV": "development",
    "NEXT_PUBLIC_BACKEND_URL": "https://api-dev.experia.com",
    "NEXT_PUBLIC_TEAM": "development"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_BACKEND_URL": "https://api-dev.experia.com",
      "NEXT_PUBLIC_TEAM": "development"
    }
  },
  "functions": {
    "app/**/*.tsx": {
      "maxDuration": 30
    }
  },
  "regions": ["icn1"],
  "framework": "nextjs"
}
```

### **설정 설명**

- **`env`**: 런타임 환경변수
- **`build.env`**: 빌드 시점 환경변수
- **`functions`**: 서버리스 함수 설정 (최대 실행 시간 30초)
- **`regions`**: 배포 지역 (서울: icn1)
- **`framework`**: Next.js 프레임워크 자동 감지

## 3. 자동 배포

### **브랜치별 배포**

- **`dev`**: 개발 환경 자동 배포
- **`P6-158-vercel`**: Vercel 테스트 배포
- **`main`**: 프로덕션 환경 (AWS EC2)

### **배포 트리거**

- **Push**: 브랜치에 푸시 시 자동 배포
- **PR Preview**: Pull Request 생성 시 미리보기 배포
- **Manual**: Vercel 대시보드에서 수동 배포

## 4. 배포 모니터링

### **배포 상태 확인**

1. **Vercel 대시보드**: 배포 진행 상황 실시간 확인
2. **배포 로그**: 빌드 및 배포 과정 상세 로그
3. **성능 메트릭**: Core Web Vitals, 페이지 로드 시간

### **에러 디버깅**

- **빌드 에러**: `vercel.json` 설정 및 환경변수 확인
- **런타임 에러**: 브라우저 개발자 도구 및 Vercel 함수 로그
- **환경변수**: Vercel 대시보드에서 값 확인

## 5. 성능 최적화

### **이미지 최적화**

```tsx
import Image from 'next/image';

<Image src='/images/logo.svg' alt='Experia Logo' width={200} height={100} priority />;
```

### **번들 최적화**

- **Dynamic Import**: 필요시에만 컴포넌트 로드
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Code Splitting**: 페이지별 코드 분할

### **캐싱 전략**

- **Static Generation**: 정적 페이지 사전 생성
- **ISR**: 증분 정적 재생성
- **Edge Caching**: Vercel Edge Network 활용

## 6. 환경별 설정

### **Development (dev 브랜치)**

- **도메인**: `experia-dev.vercel.app`
- **환경변수**: 개발용 API 엔드포인트
- **자동배포**: Push 시 즉시 배포

### **Production (main 브랜치)**

- **도메인**: AWS EC2 (포트 7100)
- **환경변수**: 프로덕션 API 엔드포인트
- **배포**: GitHub Actions + Docker

## 7. 문제 해결

### **일반적인 문제**

1. **환경변수 누락**: Vercel 대시보드에서 확인
2. **빌드 실패**: `vercel.json` 설정 검토
3. **배포 지연**: 지역 설정 및 함수 타임아웃 확인

### **디버깅 명령어**

```bash
# 로컬에서 Vercel 환경 시뮬레이션
vercel dev

# 배포 상태 확인
vercel ls

# 로그 확인
vercel logs
```

## 8. 보안 고려사항

### **환경변수 보안**

- **민감한 정보**: Vercel 대시보드에서만 설정
- **공개 변수**: `NEXT_PUBLIC_` 접두사 사용
- **비공개 변수**: 서버 사이드에서만 접근

### **도메인 보안**

- **HTTPS**: 자동 SSL 인증서 적용
- **CORS**: 적절한 CORS 정책 설정
- **Rate Limiting**: API 호출 제한 설정

## 9. 비용 관리

### **Vercel 플랜**

- **Hobby**: 무료 (개인 프로젝트)
- **Pro**: $20/월 (팀 프로젝트)
- **Enterprise**: 맞춤형 (대규모 프로젝트)

### **사용량 모니터링**

- **함수 실행 시간**: 월 100GB-초
- **대역폭**: 월 100GB
- **빌드 시간**: 월 6000분

## 10. 마이그레이션 가이드

### **기존 배포에서 Vercel로**

1. **환경변수 이전**: 기존 설정을 Vercel로 복사
2. **도메인 연결**: 기존 도메인을 Vercel로 연결
3. **점진적 전환**: 트래픽을 점진적으로 Vercel로 이동

### **롤백 전략**

- **이전 배포**: Vercel 대시보드에서 이전 버전으로 롤백
- **긴급 복구**: 기존 AWS EC2 배포로 즉시 전환
- **데이터 백업**: 정기적인 데이터 백업 및 복구 계획
