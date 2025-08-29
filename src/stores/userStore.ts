import { create } from 'zustand';
import { User } from '@/types/schema/userSchema';

export interface UserState extends User {
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(set => ({
  email: '',
  name: '',
  profileUrl: '',
  accessToken: '',
  refreshToken: '',
  setUser: (user: User | null) => set({ ...user }),
  clearUser: () => set({ email: '', name: '', profileUrl: '', accessToken: '', refreshToken: '' }),
}));
