# Zod 검증 개선 사항

## 🎯 개선 목표

- API 응답 데이터의 런타임 검증을 일관되게 적용
- 에러 처리 방식을 통일하여 안정성 향상
- 개발자 경험 개선 (명확한 에러 메시지)

## 🔧 주요 변경사항

### 1. 통합된 API 검증 유틸리티 생성

**파일**: `src/utils/api-validation.ts`

```typescript
// 기본 검증 함수
export const validateApiResponse = <T>(response: unknown, schema: z.ZodSchema<T>): T => {
  // 검증 실패 시 상세한 에러 메시지 제공
};

// 안전한 검증 함수 (에러 시 null 반환)
export const safeValidateApiResponse = <T>(response: unknown, schema: z.ZodSchema<T>): T | null => {
  // 에러 발생 시 null 반환하여 앱 크래시 방지
};

// 검증 성공 여부만 확인
export const isValidApiResponse = <T>(response: unknown, schema: z.ZodSchema<T>): response is T => {
  // 타입 가드 역할
};
```

### 2. 로그인/회원가입 API 검증 추가

**파일**: `src/app/(auth)/signin/page.tsx`, `src/app/(auth)/signup/page.tsx`

**개선 전**:

```typescript
const { user, accessToken, refreshToken } = await response.json();
```

**개선 후**:

```typescript
const rawData = await response.json();
const validatedData = validateApiResponse(rawData, LoginResponseSchema);
const { user, accessToken, refreshToken } = validatedData;
```

### 3. 기존 검증 코드 통일

**파일**:

- `src/app/(global)/mypage/my-activities/page.tsx`
- `src/app/(global)/mypage/my-reservations/MyReservationsContent.tsx`
- `src/app/(global)/activities/[id]/components/CreateReview.tsx`

**개선 전**:

```typescript
const validatedData = Activities.parse(response);
```

**개선 후**:

```typescript
const validatedData = validateApiResponse(response, Activities);
```

### 4. 서버 사이드 API 검증 추가

**파일**: `src/app/(global)/activities/[id]/page.tsx`

```typescript
// 체험 상세 정보 검증
const rawData = await res.json();
return validateApiResponse(rawData, ActivityDetail);

// 리뷰 정보 검증
const rawData = await res.json();
return validateApiResponse(rawData, ActivityReview);
```

## 🚀 사용법 가이드

### 기본 사용법

```typescript
import { validateApiResponse } from '@/utils/api-validation';
import { UserSchema } from '@/types/schema/userSchema';

const fetchUser = async () => {
  const response = await fetch('/api/user');
  const rawData = await response.json();

  // 검증 및 타입 안전성 보장
  return validateApiResponse(rawData, UserSchema);
};
```

### 안전한 사용법 (에러 방지)

```typescript
import { safeValidateApiResponse } from '@/utils/api-validation';

const fetchUserSafely = async () => {
  const response = await fetch('/api/user');
  const rawData = await response.json();

  // 검증 실패 시 null 반환
  const user = safeValidateApiResponse(rawData, UserSchema);
  if (!user) {
    console.warn('사용자 데이터 검증 실패');
    return null;
  }
  return user;
};
```

### 타입 가드 사용법

```typescript
import { isValidApiResponse } from '@/utils/api-validation';

const processData = (data: unknown) => {
  if (isValidApiResponse(data, UserSchema)) {
    // 여기서 data는 User 타입으로 추론됨
    console.log(data.email); // 타입 안전
  }
};
```

## 🛡️ 에러 처리 개선

### 검증 실패 시 에러 메시지

```
API 응답 형식이 올바르지 않습니다:
- email: 잘못된 이메일 형식입니다
- nickname: 닉네임은 2자 이상이어야 합니다
```

### 로깅 개선

- 검증 실패 시 상세한 에러 정보와 받은 데이터를 콘솔에 출력
- 개발 환경에서 디버깅 용이성 향상

## 📊 개선 효과

### 1. 타입 안전성 향상

- 런타임에서 API 응답 데이터 검증
- 예상치 못한 데이터 형식으로 인한 런타임 에러 방지

### 2. 개발자 경험 개선

- 명확하고 구체적인 에러 메시지
- 일관된 검증 패턴으로 코드 가독성 향상

### 3. 안정성 향상

- 서버 API 변경 시 클라이언트에서 즉시 감지
- 데이터 무결성 보장

## 🧪 테스트 방법

### 1. 정상 케이스 테스트

```bash
# 로그인 테스트
npm run dev
# 브라우저에서 로그인 시도

# 마이페이지 접근 테스트
# /mypage/my-activities 접근
# /mypage/my-reservations 접근
```

### 2. 에러 케이스 테스트

```typescript
// 잘못된 API 응답 시뮬레이션
const mockInvalidResponse = { user: null, token: 'invalid' };
try {
  validateApiResponse(mockInvalidResponse, LoginResponseSchema);
} catch (error) {
  console.log('예상된 에러:', error.message);
}
```

### 3. 성능 테스트

- 검증 로직이 성능에 미치는 영향 최소화
- Zod의 빠른 파싱 성능 활용

## 🔄 향후 개선 계획

1. **자동화된 스키마 생성**: OpenAPI 스펙에서 Zod 스키마 자동 생성
2. **캐싱 최적화**: 검증된 데이터 캐싱으로 성능 향상
3. **모니터링**: 검증 실패율 모니터링 및 알림
4. **문서화**: API 응답 스키마 문서 자동 생성

## 📝 주의사항

1. **서버 API 변경**: 서버 API가 변경되면 해당 Zod 스키마도 함께 업데이트 필요
2. **성능 고려**: 대용량 데이터 검증 시 성능 영향 고려
3. **에러 처리**: 검증 실패 시 사용자에게 적절한 에러 메시지 표시 필요
