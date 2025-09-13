import { z } from 'zod';

/**
 * API 응답을 Zod 스키마로 검증하는 유틸리티 함수
 * @param response API 응답 데이터
 * @param schema Zod 스키마
 * @returns 검증된 데이터
 * @throws ZodError 검증 실패 시 상세한 에러 정보와 함께 에러 발생
 */
export const validateApiResponse = <T>(response: unknown, schema: z.ZodSchema<T>): T => {
  try {
    return schema.parse(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // 상세한 검증 에러 정보 로깅
      console.error('API 응답 검증 실패:', {
        errors: error.issues,
        receivedData: response,
      });

      // 사용자 친화적인 에러 메시지 생성
      const errorMessages = error.issues.map((err: z.ZodIssue) => {
        const path = err.path.length > 0 ? `${err.path.join('.')}: ` : '';
        return `${path}${err.message}`;
      });

      throw new Error(`API 응답 형식이 올바르지 않습니다: ${errorMessages.join(', ')}`);
    }
    throw error;
  }
};

/**
 * 안전한 API 응답 검증 함수 (에러 발생 시 null 반환)
 * @param response API 응답 데이터
 * @param schema Zod 스키마
 * @returns 검증된 데이터 또는 null
 */
export const safeValidateApiResponse = <T>(response: unknown, schema: z.ZodSchema<T>): T | null => {
  try {
    return validateApiResponse(response, schema);
  } catch (error) {
    console.warn('API 응답 검증 실패 (안전 모드):', error);
    return null;
  }
};

/**
 * API 응답이 예상된 형식인지 확인하는 헬퍼 함수
 * @param response API 응답 데이터
 * @param schema Zod 스키마
 * @returns 검증 성공 여부
 */
export const isValidApiResponse = <T>(response: unknown, schema: z.ZodSchema<T>): response is T => {
  try {
    schema.parse(response);
    return true;
  } catch {
    return false;
  }
};
