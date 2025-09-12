'use client';

import { Input } from '@headlessui/react';
import Image from 'next/image';
import { useCallback, useState, useEffect } from 'react';

import SnbList from './Snb/SnbList';
import InfoIcon from '@/assets/icons/ic_mypage1.svg';
import MyReservationIcon from '@/assets/icons/ic_mypage2.svg';
import MyActivityIcon from '@/assets/icons/ic_mypage3.svg';
import ReservationIcon from '@/assets/icons/ic_mypage4.svg';
import defaultProfileImage from '@/assets/imgs/defaultProfile/default.png';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PATHS } from '@/constants';
import useImageUpload from '@/hooks/useImageUpload';
import { useUserStore } from '@/stores/userStore';


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
  const user = useUserStore(state => state.user);
  const updateProfileImage = useUserStore(state => state.updateProfileImage);
  const [profileImageUrl, setProfileImageUrl] = useState(
    user?.profileImageUrl || defaultProfileImage,
  );
  const { handleChangeImage, fileRef, isUploading } = useImageUpload('/users/me/image');

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const res = await handleChangeImage(e);
        if (res && res.profileImageUrl) {
          // 로컬 상태 업데이트
          setProfileImageUrl(res.profileImageUrl);
          // 전역 상태 업데이트
          updateProfileImage(res.profileImageUrl);
          alert('프로필 사진이 성공적으로 변경되었습니다.');
        }
      } catch (error) {
        console.error('프로필 사진 업로드 실패:', error);
        alert('프로필 사진 업로드에 실패했습니다.');
      }
    },
    [handleChangeImage, updateProfileImage],
  );

  // user 상태가 변경될 때 프로필 이미지 업데이트
  useEffect(() => {
    if (user?.profileImageUrl) {
      setProfileImageUrl(user.profileImageUrl);
    } else {
      setProfileImageUrl(defaultProfileImage);
    }
  }, [user?.profileImageUrl]);

  const handleButtonClick = () => {
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
