'use client';
//lib
import clsx from 'clsx';
//hook
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
//img
import KebabButton from '@/assets/imgs/activityPage/ic_Kebab.svg';
import MarkInMap from '@/assets/imgs/activityPage/ic_MarkInMap.svg';
import Star from '@/assets/imgs/activityPage/ic_Star.svg';

const ActivityPage = () => {
  const winWidth = useWindowWidth(); // 가로 값
  console.log(winWidth);
  //mock****************************
  const ActivityContent = {
    tag: '문화•예술',
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 4.9,
    reviewCount: 293,
    adress: '서울 중구 청계천로 100 10F',
    description:
      '안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.',
  };
  //*********************************** */

  return (
    <main className='fill bg-[#fafafa]'>
      <div className='flex flex-row justify-between p-4 md:p-6'>
        <div className='flex flex-col'>
          <div className='mb-[10px] text-[14px] text-gray-900'>{ActivityContent.tag}</div>
          <div className='text-nomad-black mb-[16px] text-[24px] font-bold'>
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
              <p className='text-nomad-black'>{ActivityContent.adress}</p>
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
          'overflow-hidden md:mr-6 md:ml-6 md:grid-cols-4 md:grid-rows-2 md:gap-1 md:rounded-[10px]',
        )}
      >
        <div className='full h-full bg-[#b3b3b3] md:col-span-2 md:row-span-2'> image 1</div>
        <div className='bg-[#b3b3b3]'>image 2</div>
        <div className='bg-[#b3b3b3]'>image 3</div>
        <div className='bg-[#b3b3b3]'>image 4</div>
        <div className='bg-[#b3b3b3]'>image 5</div>
      </div>
      <div className='mt-[15px] mr-[24px] mb-[40px] ml-[24px]'>
        <div className='text-nomad-black mb-4 text-[20px] font-bold'>체험 설명</div>
        <div className='text-nomad-black mb-4'>{ActivityContent.description}</div>
        <hr className='mb-4 border-gray-400'></hr>
        <div className='mb-2 h-[482px] rounded-[20px] bg-[#b3b3b3]'>mapLocation</div>
        <div className='flex gap-[3px]'>
          <div className='flex flex-col justify-center gap-[3px]'>
            <MarkInMap />
          </div>
          <p className='text-nomad-black'>{ActivityContent.adress}</p>
        </div>
      </div>
    </main>
  );
};
export default ActivityPage;
