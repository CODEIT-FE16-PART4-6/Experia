'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScrollY from '@/hooks/useScrollY';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Avatar from '@/components/ui/Avatar';
import { useUserStore } from '@/stores/userStore';
import { ROUTES } from '@/constants';
import useLogout from '@/hooks/useLogout';
import NotificationPopover from '@/components/notification/NotificationPopover';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollY = useScrollY();
  const user = useUserStore(state => state.user); // 유저정보 가져오기
  const [DropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(prev => !prev);
  };

  const logout = useLogout();

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
            <>
              <ul className='flex items-center divide-x divide-gray-300'>
                <li className='flex pr-3 md:pr-5'>
                  <button>
                    <AlarmIcon className='hover:text-primary text-gray-700 transition-colors' />
                  </button>
                </li>
                <li className='pl-3 md:pl-5'>
                  <button
                    type='button'
                    className='hover:text-primary flex items-center gap-2.5 transition-colors'
                    onClick={handleProfileClick}
                  >
                    <Avatar imgSrc={user.profileImageUrl ?? null} size='md' />
                    {user.nickname}
                  </button>
                  {DropdownOpen && (
                    <div className='group absolute top-10 right-2 z-50 mt-2 w-40 overflow-hidden rounded-md border border-gray-300 bg-white shadow-2xl'>
                      <Link
                        href={ROUTES.MY_PAGE}
                        className='flex h-[50px] w-full cursor-pointer flex-col justify-center border-b border-gray-300 px-2 py-2 text-center hover:bg-gray-200'
                      >
                        마이페이지
                      </Link>
                      <div
                        className='group-hover:gray-100 flex h-[50px] w-full cursor-pointer flex-col justify-center px-2 py-2 text-center hover:bg-gray-200'
                        onClick={() => logout()}
                      >
                        로그아웃
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </>
            <ul className='flex items-center divide-x divide-gray-300'>
              <li className='flex pr-3 md:pr-5'>
                <NotificationPopover />
              </li>
              <li className='pl-3 md:pl-5'>
                <button
                  type='button'
                  className='hover:text-primary flex items-center gap-2.5 transition-colors'
                  onClick={handleProfileClick}
                >
                  <Avatar imgSrc={user.profileImageUrl ?? null} size='md' />
                  {user.nickname}
                </button>
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
