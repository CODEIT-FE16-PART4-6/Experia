'use client';

//hook
import { useState } from 'react';
//lib
import clsx from 'clsx';
import Image from 'next/image';
//SSR
//img
import ImageArrowLeft from '@/assets/imgs/activityPage/imageArrowLeft.svg';
import ImageArrowRight from '@/assets/imgs/activityPage/imageArrowRight.svg';

interface SubImage {
  id: number;
  imageUrl?: string | null; //<=@
}

interface ImagePropType {
  bannerImageUrl: string;
  subImages: SubImage[];
  tag: string;
}

const MAX_SUB_ITEMS = 4; // 서브 이미지의 최대 개수

const PostImage = ({ bannerImageUrl, subImages, tag }: ImagePropType) => {
  const emptySlots = MAX_SUB_ITEMS - subImages.length; // 빈 이미지 슬롯 카운트
  const [currentIndex, setCurrentIndex] = useState(0); // 모바일 버전 이미지 인덱스 스테이트

  const tagName = new Map([
    ['문화 · 예술', 'culture'],
    ['식음료', 'foodNdrinks'],
    ['스포츠', 'sports'],
    ['투어', 'tour'],
    ['관광', 'sightseeing'],
    ['웰빙', 'wellbeing'],
  ]);

  //모바일 전용 이미지 배열 배너 이미지 + 서브 이미지들
  const mobileImages = [
    { id: 'banner', url: bannerImageUrl, alt: '대표 이미지' },
    ...subImages.map(img => ({
      id: img.id,
      url: img.imageUrl,
      alt: `서브 이미지${img.id}`,
    })),
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? mobileImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === mobileImages.length - 1 ? 0 : prev + 1));
  };

  const englishTag = tagName.get(tag) || 'default';
  console.log(englishTag);
  return (
    <>
      <div className='relative block h-[310px] md:hidden'>
        <div className='relative h-full'>
          <Image
            src={mobileImages[currentIndex].url!}
            alt='소개 이미지'
            fill
            className='object-cover'
          />
          {/* 이미지가 두개 이상일때 이미지 넘기는 버튼 렌더링*/}
          {mobileImages.length > 1 && (
            <div className='group'>
              <button
                onClick={handlePrev}
                className='absolute top-1/2 left-3 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
              >
                <ImageArrowLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className='absolute top-1/2 right-3 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
              >
                <ImageArrowRight size={24} />
              </button>
              <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-[5px] bg-black/70 px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                {mobileImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 w-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={clsx(
          'hidden h-[310px] md:grid',
          'lg:mx-auto lg:h-[534px] lg:w-[1152px] lg:gap-2',
          'overflow-hidden md:mr-6 md:ml-6 md:grid-cols-4 md:grid-rows-2 md:gap-1 md:rounded-[10px]',
        )}
      >
        <div className='full relative h-full bg-[#b3b3b3] md:col-span-2 md:row-span-2'>
          <Image src={bannerImageUrl} alt='대표 이미지' fill className='object-cover' />
        </div>
        {subImages.map((subimg: SubImage) => (
          <div key={subimg.id} className='full relative bg-[#b3b3b3]'>
            <Image
              src={subimg.imageUrl!}
              alt={`서브 이미지${subimg.id}`}
              fill
              className='object-cover'
            />
          </div>
        ))}
        {emptySlots > 0 &&
          Array.from({ length: emptySlots }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className='flex items-center justify-center bg-[#b3b3b3] text-gray-500'
            >
              <Image
                src={`/images/ActivityPageImgs/${englishTag}.png`}
                alt='공백 이미지'
                width={30}
                height={30}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default PostImage;
