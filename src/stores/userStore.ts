import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserSchema, User } from '@/types/schema/userSchema';

export interface UserState extends User {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      email: '',
      name: '',
      profileUrl: '',
      token: '',
      setUser: user => {
        try {
          // Zod 스키마를 사용하여 데이터 파싱 및 유효성 검사
          const validatedUser = UserSchema.parse(user);

          // 유효성 검사가 성공하면 스토어에 저장
          set({
            email: validatedUser.email,
            name: validatedUser.name,
            profileUrl: validatedUser.profileUrl,
            token: validatedUser.token,
          });
        } catch (error) {
          // 유효성 검사가 실패하면 에러 처리
          console.error('유저 정보 유효성 검사 실패:', error);
          // 추후 에러 처리 추가 필요
        }
      },
      clearUser: () =>
        set({
          email: '',
          name: '',
          profileUrl: '',
          token: '',
        }),
    }),
    {
      name: 'user-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined, // createJSONStorage 사용
    },
  ),
);
