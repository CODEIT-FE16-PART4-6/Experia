'use client';
import Link from 'next/link';
import Image from 'next/image';
import InfoIcon from '@/assets/icons/ic_mypage1.svg';
import MyReservationIcon from '@/assets/icons/ic_mypage2.svg';
import MyActivityIcon from '@/assets/icons/ic_mypage3.svg';
import ReservationIcon from '@/assets/icons/ic_mypage4.svg';

const Snb = () => {
  return (
    <nav>
      <div className='mb-6 flex items-center justify-center'>
        <div className='relative'>
          <Image src='/images/img_user_mock.png' alt='유저 목이미지' width={160} height={160} />
          <button className='absolute right-[15px] bottom-[10px]'>
            <Image src='/icons/ic_edit.svg' alt='유저 사진 수정 버튼' width={44} height={44} />
          </button>
        </div>
      </div>
      <ul>
        <li className='hover:text-nomad-black'>
          <Link href='/mypage' className='group hover:bg-green-light mt-2 flex gap-2 rounded p-2'>
            <InfoIcon
              src='/icons/ic_mypage1.svg'
              alt='내 정보'
              width={24}
              height={24}
              className='group-hover:text-nomad-black'
            />
            <span className='group-hover:text-nomad-black'>내 정보</span>
          </Link>
        </li>
        <li className='group hover:text-nomad-black'>
          <Link
            href='/mypage/my-reservations'
            className='hover:bg-green-light mt-2 flex gap-2 rounded p-2'
          >
            <MyReservationIcon src='/icons/ic_mypage2.svg' alt='예약 내역' width={24} height={24} />
            예약 내역
          </Link>
        </li>
        <li className='group hover:text-nomad-black'>
          <Link
            href='/mypage/my-activities'
            className='hover:bg-green-light mt-2 flex gap-2 rounded p-2'
          >
            <MyActivityIcon src='/icons/ic_mypage3.svg' alt='내 체험 관리' width={24} height={24} />
            내 체험 관리
          </Link>
        </li>
        <li className='group hover:text-nomad-black'>
          <Link
            href='/mypage/reservations'
            className='hover:bg-green-light mt-2 flex gap-2 rounded p-2'
          >
            <ReservationIcon src='/icons/ic_mypage4.svg' alt='예약 현황' width={24} height={24} />
            예약 현황
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Snb;
