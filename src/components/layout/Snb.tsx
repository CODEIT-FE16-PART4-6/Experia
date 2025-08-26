'use client';
import useWindowWidth from '@/hooks/useWindowWidth';
import Link from 'next/link';
import Image from 'next/image';

const Snb = () => {
  const windowSize = useWindowWidth();

  if (windowSize === undefined) {
    return null; // 또는 로딩 상태 표시
  }

  const widthClass = windowSize >= 1024 ? 'w-[384px]' : windowSize >= 600 ? 'w-[251px]' : 'hidden'; // 모바일일 때 숨기기
  if (widthClass === 'hidden') return null; // 모바일에서는 아예 숨기기

  return (
    <nav
      className={`h-[432px] bg-gray-100 ${widthClass} items-center rounded-r-xl border border-gray-400`}
    >
      <div>
        <Image src='/images/img_user_mock.png' alt='유저 목이미지' width={100} height={100} />
      </div>
      <ul className='space-y-2 p-4'>
        <li>
          <Link href='/mypage' className='rounded p-2 hover:bg-gray-200'>
            <Image src='/icons/ic_mypage1.svg' alt='내 정보' width={16} height={16} />내 정보
          </Link>
        </li>
        <li>
          <Link href='/mypage/reservations' className='rounded p-2 hover:bg-gray-200'>
            <Image src='/icons/ic_mypage2.svg' alt='예약 내역' width={16} height={16} />
            예약 내역
          </Link>
        </li>
        <li>
          <Link href='/mypage/myActivities' className='rounded p-2 hover:bg-gray-200'>
            <Image src='/icons/ic_mypage3.svg' alt='내 체험 관리' width={16} height={16} />내 체험
            관리
          </Link>
        </li>
        <li>
          <Link href='/mypage/myReservation' className='rounded p-2 hover:bg-gray-200'>
            <Image src='/icons/ic_mypage4.svg' alt='예약 현황' width={16} height={16} />
            예약 현황
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Snb;
