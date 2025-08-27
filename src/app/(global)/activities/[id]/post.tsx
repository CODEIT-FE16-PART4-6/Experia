'use client';
//lib
import clsx from 'clsx';
import Image from 'next/image';
//hook
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
//img
import KebabButton from '@/assets/imgs/activityPage/ic_Kebab.svg';
import MarkInMap from '@/assets/imgs/activityPage/ic_MarkInMap.svg';
import Star from '@/assets/imgs/activityPage/ic_Star.svg';

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface SubImage {
  id: number;
  imageUrl: string;
}

interface Activity {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  schedules: Schedule[];
  subImages: SubImage[];
  title: string;
  updatedAt: string;
}

interface ActivityProps {
  data: Activity;
}
const ActivityPost = ({ data }: ActivityProps) => {
  let winWidth = useWindowWidth(); // 가로 값
  if (!winWidth) {
    winWidth = 0;
  }
  console.log('데이터 잘 받아왔나 테스트 타이틀 출력 : ', data.title);
  //mock****************************
  const ActivityContent = {
    tag: data.category,
    title: data.title,
    rating: data.rating,
    reviewCount: data.reviewCount,
    address: data.address,
    description: data.description,
  };
  //*********************************** */

  return (
    <main className='fill bg-[#fafafa]'>
      <div className='flex flex-row justify-between p-4 md:p-6 lg:mx-auto lg:w-[1200px]'>
        <div className='flex flex-col'>
          <div className='mb-[10px] text-[14px] text-gray-900'>{ActivityContent.tag}</div>
          <div className='text-nomad-black mb-[16px] text-[24px] font-bold md:text-[32px]'>
            {ActivityContent.title}
          </div>
          <div className='flex gap-3 text-[14px] text-gray-900'>
            <div className='flex gap-1'>
              <div className='flex flex-col justify-center'>
                <Star />
              </div>
              {ActivityContent.rating}({ActivityContent.reviewCount})
            </div>
            <div className='flex gap-[3px]'>
              <div className='flex flex-col justify-center gap-[3px]'>
                <MarkInMap />
              </div>
              <p className='text-nomad-black'>{ActivityContent.address}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <button>
            <KebabButton />
          </button>
        </div>
      </div>
      <div
        className={clsx(
          'h-[310px]',
          'md:grid',
          'lg:mx-auto lg:h-[534px] lg:w-[1152px] lg:gap-2',
          'overflow-hidden md:mr-6 md:ml-6 md:grid-cols-4 md:grid-rows-2 md:gap-1 md:rounded-[10px]',
        )}
      >
        <div className='full relative h-full bg-[#b3b3b3] md:col-span-2 md:row-span-2'>
          <Image src={data.bannerImageUrl} alt='대표 이미지' fill className='object-cover' />
        </div>
        {data.subImages.map((subimg: SubImage) => (
          <div key={subimg.id} className='full relative bg-[#b3b3b3]'>
            <Image
              src={subimg.imageUrl}
              alt={`서브 이미지${subimg.id}`}
              fill
              className='object-cover'
            />
          </div>
        ))}
        <div className='bg-[#b3b3b3]'>이미지 준비중 . . .</div>
      </div>
      <div className='mt-8 flex md:pr-[24px] lg:mx-auto lg:mt-[85px] lg:w-[1152px] lg:gap-6'>
        <div className='lg:w-[786px]'>
          {winWidth > 720 ? <hr className='mb-10 border-gray-400' /> : null}
          <div className='justify-left mt-[15px] mb-[16px] flex flex-col gap-4 pr-[24px] pl-[24px] lg:p-[0px]'>
            <div className='text-nomad-black text-[20px] font-bold'>체험 설명</div>
            <div className='text-nomad-black mb-4'>{ActivityContent.description}</div>
          </div>
          <hr className='mx-6 mb-4 border-gray-400 md:mx-[0px] md:my-10'></hr>
          <div className='mt-[15px] mr-[24px] mb-[40px] ml-[24px] lg:mr-[0px] lg:ml-[0px]'>
            <div className='flex flex-col gap-[3px]'>
              <div className='mb-2 h-[450px] rounded-[20px] bg-[#b3b3b3] md:h-[276px] lg:h-[450px] lg:w-[790px]'>
                mapLocation
              </div>
              <div className='flex gap-[5px]'>
                <div className='ml-[5px] flex flex-col justify-center gap-[3px]'>
                  <MarkInMap />
                </div>
                <p className='text-nomad-black'>{ActivityContent.address}</p>
              </div>
            </div>
          </div>
          {winWidth > 720 ? <hr className='mt-10 mb-10 border-gray-400' /> : null}
        </div>
        <div>
          {winWidth > 720 ? (
            <div className='h-[423px] w-[251px] rounded-[10px] bg-[#b3b3b3] lg:h-[746px] lg:w-[340px]'>
              예약 컴포넌트
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </main>
  );
};
export default ActivityPost;
