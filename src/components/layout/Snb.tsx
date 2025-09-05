'use client';

import Image from 'next/image';
import InfoIcon from '@/assets/icons/ic_mypage1.svg';
import MyReservationIcon from '@/assets/icons/ic_mypage2.svg';
import MyActivityIcon from '@/assets/icons/ic_mypage3.svg';
import ReservationIcon from '@/assets/icons/ic_mypage4.svg';
import { PATHS } from '@/constants';
import SnbList from './Snb/SnbList';
import { Input } from '@headlessui/react';
import useImageUpload from '@/hooks/useImageUpload';
import { useCallback, useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

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
const defaultProfileImage = require('@/assets/imgs/defaultProfile/default.png');

const Snb = () => {
  const [profileImageUrl, setProfileImageUrl] = useState(defaultProfileImage);
  const { handleChangeImage, fileRef, isUploading } = useImageUpload('users/me/image');

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const res = await handleChangeImage(e);
      if (res) {
        setProfileImageUrl(res.profileImageUrl);
      }
    },
    [handleChangeImage],
  );

  const handleButtonClick = () => {
    console.log('버튼 클릭');
    fileRef.current?.click();
  };

  return (
    <nav>
      <div className='mb-6 flex items-center justify-center'>
        <div className='relative'>
          <figure className='flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full'>
            {isUploading ? (
              <LoadingSpinner />
            ) : (
              <Image
                src={profileImageUrl}
                alt='프로필사진'
                width={160}
                height={160}
                className='aspect-square object-cover'
              />
            )}
          </figure>
          <button onClick={handleButtonClick} className='absolute right-[15px] bottom-[10px]'>
            <Image src='/icons/ic_edit.svg' alt='유저 사진 수정 버튼' width={44} height={44} />
          </button>
          <Input
            type='file'
            className='hidden'
            accept='image/*'
            ref={fileRef}
            onChange={handleImageUpload}
          />
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
