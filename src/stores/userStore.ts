'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { ROUTES } from '@/constants';
import { User } from '@/types/schema/userSchema';
export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  updateProfileImage: (profileImageUrl: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      // 초기 사용자 상태
      user: null,

      // 액션: 로그인
      setUser: user => set({ user }),

      // 액션: 사용자 정보 업데이트
      updateUser: updates =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // 액션: 프로필 이미지 업데이트
      updateProfileImage: profileImageUrl =>
        set(state => ({
          user: state.user ? { ...state.user, profileImageUrl } : null,
        })),

      // 액션: 로그아웃
      clearUser: async () => {
        set({ user: null });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // 쿠키에 저장된 토큰도 제거
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) {
          console.error('로그아웃 API 실패', e);
        }

        const currentPathnmae = window.location.pathname;
        if (currentPathnmae.startsWith(ROUTES.MY_PAGE)) {
          window.location.href = ROUTES.LOGIN;
        }
      },
    }),

    // persist option
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
