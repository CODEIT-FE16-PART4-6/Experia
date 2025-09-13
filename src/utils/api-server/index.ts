import { FetchOptions } from '@/types/fetchOptions';

import { REQUEST_URL } from '@/utils/api-public';

/**
 * 'GET' 요청 전용 fetch
 * @param path: 엔드포인트 (e.g. '/activities')
 * @param query?: 쿼리 파라미터 (e.g. '?method=offset&page=1', 사용 시 {method: 'offset'} 과 같은 객체 형태로 전달)
 * @param renderType?: 렌더링 방식 선택 ('ssg' | 'isr' | 'ssr') / 기본값 'ssr'
 * @param revalidate?: 재요청 주기 (초 단위)
 * @param token?: 권한 요청 시 header에 담을 인증 토큰
 */
export const fetchServerData = async <T>({
  path,
  query,
  renderType = 'ssr',
  revalidate,
  token,
}: FetchOptions): Promise<T> => {
  const url = new URL(`${REQUEST_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const options: RequestInit = {};

  // 렌더링 타입 설정
  if (renderType === 'ssr' || renderType === 'csr') options.cache = 'no-store';
  if (renderType === 'ssg') options.cache = 'force-cache';
  if (renderType === 'isr') options.next = { revalidate };

  // 토큰 설정
  if (token) {
    options.headers = { Authorization: `Bearer ${token}` };
  }

  const res = await fetch(url.toString(), options);

  if (res.status >= 400) {
    let errorMessage = `요청 실패 (status: ${res.status})`; // try catch 실패 시 fallback 문자열

    try {
      const errorBody = await res.json();

      if (errorBody && typeof errorBody === 'object' && 'message' in errorBody) {
        errorMessage = `상태 코드: ${errorBody.status}, 에러 메시지: ${errorBody.message}`;
      }
    } catch (err) {
      errorMessage = `JSON 파싱 실패: ${err instanceof Error ? err.message : String(err)}`;
    }

    throw new Error(errorMessage); // Error 인스턴스는 문자열만 전달 가능
  }

  return res.json();
};
