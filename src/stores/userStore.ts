'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/schema/userSchema';

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
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

      // 액션: 로그아웃
      clearUser: () => set({ user: null }),
    }),

    // persist option
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
