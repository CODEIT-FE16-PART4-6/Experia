'use client';

import { useUserStore } from '@/stores/userStore';
import { ROUTES } from '@/constants';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const clearUser = useUserStore(state => state.clearUser);
  const router = useRouter();
  const logout = () => {
    clearUser();

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    router.replace(ROUTES.HOME);
  };
  return logout;
};
export default useLogout;
