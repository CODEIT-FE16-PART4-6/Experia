'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

import NotificationPopover from '@/components/notification/NotificationPopover';
import Avatar from '@/components/ui/Avatar';
import { ROUTES } from '@/constants';
import useScrollY from '@/hooks/useScrollY';
import { useUserStore } from '@/stores/userStore';

import UserDropdown from './UserDropdown';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollY = useScrollY();
  const user = useUserStore(state => state.user); // 유저정보 가져오기
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setDropdownOpen(prev => !prev);
  };

  // 바깥쪽 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (DropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [DropdownOpen]);

  useEffect(() => {
    scrollY > 100 ? setIsScrolled(true) : setIsScrolled(false);
  }, [scrollY]);

  return (
    <header
      className={clsx(
        'sticky top-0 left-0 z-10 flex h-[70px] w-full items-center border border-x-0 border-t-0 border-b-gray-300 bg-white transition-shadow',
        {
          shadow: isScrolled,
        },
      )}
    >
      <div className='flex w-full items-center justify-between px-5 md:px-6 lg:mx-auto lg:w-[1200px]'>
        <Link href={ROUTES.HOME}>
          <Image src='/images/logo.svg' alt='Experia 로고' width={134} height={42} />
        </Link>
        <nav className='relative flex gap-3 font-medium text-black'>
          {user ? (
            <ul className='flex items-center divide-x divide-gray-300'>
              <li className='flex pr-3 md:pr-5'>
                <NotificationPopover />
              </li>
              <li className='pl-3 md:pl-5'>
                <div ref={dropdownRef} className='relative'>
                  <button
                    type='button'
                    className='hover:text-primary flex items-center gap-2.5 transition-colors'
                    onClick={handleProfileClick}
                  >
                    <Avatar imgSrc={user.profileImageUrl ?? null} size='md' />
                    {user.nickname}
                  </button>
                  <UserDropdown isOpen={DropdownOpen} onClose={() => setDropdownOpen(false)} />
                </div>
              </li>
            </ul>
          ) : (
            <>
              <Link href={ROUTES.LOGIN} className='nav-list'>
                로그인
              </Link>
              <Link href={ROUTES.SIGN_UP} className='nav-list'>
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
