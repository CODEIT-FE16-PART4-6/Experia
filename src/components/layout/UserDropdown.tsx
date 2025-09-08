'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ROUTES } from '@/constants';
import { useUserStore } from '@/stores/userStore';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDropdown = ({ isOpen, onClose }: UserDropdownProps) => {
  const clearUser = useUserStore(state => state.clearUser);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = () => {
    clearUser();
    onClose();
  };

  return (
    <div className='group absolute top-10 right-2 z-50 mt-2 w-40 overflow-hidden rounded-md border border-gray-300 bg-white shadow-2xl'>
      <Link
        href={ROUTES.MY_PAGE}
        className='flex h-[50px] w-full cursor-pointer flex-col justify-center border-b border-gray-300 px-2 py-2 text-center hover:bg-gray-200'
        onClick={onClose}
      >
        마이페이지
      </Link>
      <div
        className='group-hover:gray-100 flex h-[50px] w-full cursor-pointer flex-col justify-center px-2 py-2 text-center hover:bg-gray-200'
        onClick={handleLogout}
      >
        로그아웃
      </div>
    </div>
  );
};

export default UserDropdown;
