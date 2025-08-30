'use client';

import Image from 'next/image';
import InfoIcon from '@/assets/icons/ic_mypage1.svg';
import MyReservationIcon from '@/assets/icons/ic_mypage2.svg';
import MyActivityIcon from '@/assets/icons/ic_mypage3.svg';
import ReservationIcon from '@/assets/icons/ic_mypage4.svg';
import { PATHS } from '@/constants';
import SnbList from './Snb/SnbList';

const SNB_LIST = [
  {
    label: '내 정보',
    path: PATHS.MYPAGE,
    icon: InfoIcon,
  },
  {
    label: '예약 내역',
    path: PATHS.MY_RESERVATIONS,
    icon: MyReservationIcon,
  },
  {
    label: '내 체험 관리',
    path: PATHS.MY_ACTIVITIES,
    icon: MyActivityIcon,
  },
  {
    label: '예약 현황',
    path: PATHS.RESERVATIONS,
    icon: ReservationIcon,
  },
];

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
        {SNB_LIST.map(li => (
          <SnbList item={li} key={li.label} />
        ))}
      </ul>
    </nav>
  );
};

export default Snb;
