import { ROUTES } from '@/constants';
import { REQUEST_URL } from '@/utils/api-public';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

// 토큰 재발급 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      // 리프레시 토큰이 없으면 로그인 페이지로 이동
      localStorage.clear();
      window.location.href = ROUTES.LOGIN;
      return Promise.reject('로그인이 필요합니다.');
    }

    // 토큰 재발급 요청
    const response = await fetch(`${REQUEST_URL}/auth/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken;
    localStorage.setItem('access_token', newAccessToken);
    localStorage.setItem('refresh_token', newRefreshToken);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// fetch 래퍼 함수 (외부에서 이 함수 사용)
const fetchClientData = async (endpoint: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem('access_token');
  const headers = new Headers(options.headers);

  // 요청 헤더에 액세스 토큰 추가
  if (accessToken && !endpoint.includes('/auth/tokens')) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  try {
    const response = await fetch(`${REQUEST_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // 401 에러 시 토큰 재발급
      if (isRefreshing) {
        // 이미 재발급 중이면 대기
        const token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        headers.set('Authorization', `Bearer ${token}`);
        const retryResponse = await fetch(`${REQUEST_URL}${endpoint}`, { ...options, headers });
        return await retryResponse.json();
      }

      isRefreshing = true;
      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);
        headers.set('Authorization', `Bearer ${newAccessToken}`);
        const retryResponse = await fetch(`${REQUEST_URL}${endpoint}`, { ...options, headers });
        return await retryResponse.json();
      } catch (err) {
        processQueue(err as Error, null);
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API 호출 실패');
    }

    // 응답이 비어있거나 JSON이 아닌 경우 처리
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null; // 빈 응답 또는 JSON이 아닌 응답
    }

    const text = await response.text();
    if (!text.trim()) {
      return null; // 빈 응답
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.warn('JSON 파싱 실패, 빈 응답으로 처리:', parseError);
      return null;
    }
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error);
    throw error;
  }
};

/**
 * 실패 요청 대기열 처리 함수
 * - 여러 개의 요청이 동시에 토큰 만료 에러(401)를 받았을 때, 토큰 재발급 요청을 한 번만 보내고 나머지 요청들은 그 결과를 기다렸다가 처리하게 함
 * - 비효율적인 중복 재발급 요청(race condition) 방지
 * @param error 토큰 재발급 에러
 * @param token 토큰 재발급 성공 시 받아온 액세스 토큰
 */
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token); // 실패한 요청들을 새 토큰으로 재시도
    }
  });
  failedQueue = [];
};

export default fetchClientData;
