'use client';

import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { ROUTES } from '@/constants';

import { REQUEST_URL } from '../api-public';

let isRefreshing = false; // 토큰 재발급 진행중 여부

let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

// 요청 대기 큐 (race condition 방지)
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// API 클라이언트 인스턴스 생성
const apiAuth: AxiosInstance = axios.create({
  baseURL: `${REQUEST_URL}`,
});

// 요청 인터셉터: 모든 axios 요청 헤더에 액세스 토큰 추가
apiAuth.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken && !config.url?.includes('/auth/tokens')) {
      // 토큰 재발급 요청에는 액세스 토큰 제외
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
apiAuth.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; // 실패한 원본 요청 + retry

    // 401 에러 시 액세스 토큰 재발급
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 이미 토큰 재발급 중이면 재발급 완료까지 대기 (경쟁 조건(race condition) 처리)
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiAuth(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // 토큰 재발급
      try {
        const refreshToken = localStorage.getItem('refresh_token');

        // 리프레쉬 토큰 없을 경우, 로그인 페이지로 리다이렉트
        if (!refreshToken) {
          localStorage.clear();
          window.location.href = ROUTES.LOGIN;
          return Promise.reject(new Error('로그인이 필요합니다.'));
        }

        // 리프레쉬 토큰 있을 경우, 토큰 재발급
        const res = await axios.post(`${REQUEST_URL}/auth/tokens`, null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);

        // 대기열에 있던 요청들을 새로운 토큰으로 재시도
        processQueue(null, newAccessToken);

        // 원래 요청을 새로운 토큰으로 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiAuth(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시, 대기 요청들 실패 처리 후 로그인 페이지로 리다이렉트
        processQueue(refreshError as AxiosError, null);
        localStorage.clear();
        window.location.href = ROUTES.LOGIN;

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiAuth;
