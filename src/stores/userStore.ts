import { create } from 'zustand';
import { User } from '@/types/schema/userSchema';

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
  isLoggedIn: false,
}));
