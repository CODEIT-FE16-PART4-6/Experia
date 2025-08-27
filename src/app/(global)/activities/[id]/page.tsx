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
          'lg:mx-auto lg:h-[534px] lg:w-[1152px] lg:gap-2',
          'overflow-hidden md:mr-6 md:ml-6 md:grid-cols-4 md:grid-rows-2 md:gap-1 md:rounded-[10px]',
        )}
      >
        <div className='full h-full bg-[#b3b3b3] md:col-span-2 md:row-span-2'> image 1</div>
        <div className='bg-[#b3b3b3]'>image 2</div>
        <div className='bg-[#b3b3b3]'>image 3</div>
        <div className='bg-[#b3b3b3]'>image 4</div>
        <div className='bg-[#b3b3b3]'>image 5</div>
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
                <p className='text-nomad-black'>{ActivityContent.adress}</p>
              </div>
            </div>
          </div>
          {winWidth > 720 ? <hr className='mt-10 mb-10 border-gray-400' /> : null}
        </div>
        <div>
          {winWidth > 720 ? (
            <div className='h-[423px] w-[251px] rounded-[10px] bg-[#ff00ff] lg:h-[746px] lg:w-[340px]'>
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
export default ActivityPage;
