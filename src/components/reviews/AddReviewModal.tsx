'use client';
import { DialogTitle, Textarea } from '@headlessui/react';
import ActivityCard from '@/app/(global)/mypage/components/ActivityCard';
import { StarRating } from '../StarRating';
import Button from '../Button';
import Modal from '../ui/Modal';

const tempData = {
  id: 5689,
  userId: 2455,
  title: '퍼핑 빌리 & 힐스빌 야생동물 보호구역 투어',
  description:
    '코알라, 캥거루, 오리너구리, 맹금류 등과 같은 토종 동물을 볼 수 있는 힐스빌 보호구역을 탐험해보세요. 친구, 가족과 함께 편안하고 즐거운 일일 관광 코스!',
  category: '관광',
  price: 165600,
  address: '1 Old Monbulk Rd, Belgrave VIC 3160, Australia',
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/16-6_2455_1755851424005.png',
  rating: 0,
  reviewCount: 0,
  createdAt: '2025-08-22T17:34:15.540Z',
  updatedAt: '2025-08-22T17:34:15.540Z',
};

const AddReviewModal = () => {
  const handleSubmit = () => {
    console.log('temp');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <DialogTitle className='mb-2 text-lg font-bold'>리뷰 등록하기</DialogTitle>
      <ActivityCard data={tempData} type='activity' />
      <StarRating />
      <Textarea placeholder='후기를 작성해주세요' />
      <Button size='md' variant='POSITIVE' type='button' className='w-full'>
        작성하기
      </Button>
    </form>
  );
};

export default AddReviewModal;
