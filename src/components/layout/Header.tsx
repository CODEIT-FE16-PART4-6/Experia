'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScrollY from '@/hooks/useScrollY';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import AlarmIcon from '@/assets/icons/AlarmIcon.svg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollY = useScrollY();

  const handleProfileClick = () => {
    console.log('hello');
  };

  useEffect(() => {
    scrollY > 100 ? setIsScrolled(true) : setIsScrolled(false);
  }, [scrollY]);

  return (
    <header
      className={clsx(
        'sticky top-0 left-0 z-10 flex h-[70px] w-full items-center border border-gray-300 bg-white transition-shadow',
        {
          shadow: isScrolled,
        },
      )}
    >
      <div className='flex w-full items-center justify-between px-5 md:px-6 lg:mx-auto lg:w-[1200px]'>
        <Link href='/'>
          <Image src='/images/logo.svg' alt='Experia 로고' width={134} height={42} />
        </Link>
        <nav className='flex gap-3 font-medium text-black'>
          {/* 로그인 전 */}
          <Link href='/signin' className='nav-list'>
            로그인
          </Link>
          <Link href='/signup' className='nav-list'>
            회원가입
          </Link>

          {/* 로그인 후 */}
          {/* <ul className='flex items-center divide-x divide-gray-300'>
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
                <Image
                  src='/images/ProfileDefaultImg.png'
                  alt='프로필 사진'
                  width={32}
                  height={32}
                  className='rounded-full'
                />
                정만철
              </button>
            </li>
          </ul> */}
        </nav>
      </div>
    </header>
  );
};
export default Header;
