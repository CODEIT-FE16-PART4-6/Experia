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
      className={`h-[432px] bg-gray-100 font-bold text-gray-700 ${widthClass} items-center rounded-xl border border-gray-400 shadow-2xl`}
    >
      <div className='mx-auto mt-6 mb-6 flex items-center justify-center'>
        <Image src='/images/img_user_mock.png' alt='유저 목이미지' width={160} height={160} />
        <button className='absolute'>
          <Image
            src='/icons/ic_edit.svg'
            alt='유저 사진 수정 아이콘'
            width={44}
            height={44}
            className='relative bottom-[-43px] left-[44px]'
          />
        </button>
      </div>
      <ul className='mx-6'>
        <li className='group hover:text-nomad-black'>
          <Link href='/mypage' className='hover:bg-green-light mt-2 flex gap-2 rounded p-2'>
            <Image
              src='/icons/ic_mypage1.svg'
              alt='내 정보'
              width={24}
              height={24}
              className='group-hover:fill-nomad-black fill-current'
            />
            내 정보
          </Link>
        </li>
        <li className='group hover:text-nomad-black'>
          <Link
            href='/mypage/reservations'
            className='hover:bg-green-light mt-2 flex gap-2 rounded p-2'
          >
            <Image src='/icons/ic_mypage2.svg' alt='예약 내역' width={24} height={24} />
            예약 내역
          </Link>
        </li>
        <li className='group hover:text-nomad-black'>
          <Link
            href='/mypage/myActivities'
            className='hover:bg-green-light mt-2 flex gap-2 rounded p-2'
          >
            <Image src='/icons/ic_mypage3.svg' alt='내 체험 관리' width={24} height={24} />내 체험
            관리
          </Link>
        </li>
        <li className='group hover:text-nomad-black'>
          <Link
            href='/mypage/myReservation'
            className='hover:bg-green-light mt-2 flex gap-2 rounded p-2'
          >
            <Image src='/icons/ic_mypage4.svg' alt='예약 현황' width={24} height={24} />
            예약 현황
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Snb;
