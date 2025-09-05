'use client';

import { useUserStore } from '@/stores/userStore';
import { ROUTES } from '@/constants';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const { clearUser } = useUserStore();
  const router = useRouter();

  clearUser();

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  router.replace(ROUTES.HOME);
};
export default useLogout;
