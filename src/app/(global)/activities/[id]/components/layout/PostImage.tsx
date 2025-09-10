'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

import ImageArrowLeft from '@/assets/imgs/activityPage/imageArrowLeft.svg';
import ImageArrowRight from '@/assets/imgs/activityPage/imageArrowRight.svg';
import ImageRef from '@/components/ImageRef';

interface SubImage {
  id: number;
  imageUrl?: string | null;
}

interface ImagePropType {
  bannerImageUrl: string;
  subImages: SubImage[];
  tag: string;
}

const MAX_SUB_ITEMS = 4;

const PostImage = ({ bannerImageUrl, subImages, tag }: ImagePropType) => {
  const emptySlots = MAX_SUB_ITEMS - subImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const tagName = new Map([
    ['문화 · 예술', 'culture'],
    ['식음료', 'foodNdrinks'],
    ['스포츠', 'sports'],
    ['투어', 'tour'],
    ['관광', 'sightseeing'],
    ['웰빙', 'wellbeing'],
  ]);

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

  return (
    <>
      <div className='relative block h-[310px] md:hidden'>
        <div className='relative h-full overflow-hidden'>
          <div
            className='relative flex h-full transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {mobileImages.map((image, idx) => (
              <div key={idx} className='relative h-full w-full flex-shrink-0'>
                <Image src={image.url!} alt='소개 이미지' fill className='object-cover' />
              </div>
            ))}
          </div>
          {mobileImages.length > 1 && (
            <div className='group'>
              <button
                onClick={handlePrev}
                className='absolute top-1/2 left-3 -translate-y-1/2 opacity-50 transition-opacity duration-300 group-hover:opacity-100'
              >
                <ImageArrowLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className='absolute top-1/2 right-3 -translate-y-1/2 opacity-50 transition-opacity duration-300 group-hover:opacity-100'
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
      {/*테블릿, PC 화면 렌더링 */}
      <Gallery options={{ fitRatio: 0.5 }}>
        <div
          className={clsx(
            'hidden h-[310px] md:grid',
            'lg:mx-auto lg:h-[534px] lg:w-[1152px] lg:gap-2',
            'overflow-hidden md:mr-6 md:ml-6 md:grid-cols-4 md:grid-rows-2 md:gap-1 md:rounded-[10px]',
          )}
        >
          <div className='group relative h-full w-full bg-[#b3b3b3] md:col-span-2 md:row-span-2'>
            <Item
              original={mobileImages[0].url ?? undefined}
              thumbnail={mobileImages[0].url ?? undefined}
              width={600}
              height={400}
            >
              {({ ref, open }) => (
                <ImageRef
                  ref={ref}
                  onClick={e => open(e)}
                  src={bannerImageUrl}
                  alt='대표 이미지'
                  fill
                  className='cursor-pointer object-cover'
                  unoptimized
                />
              )}
            </Item>
            <div className='pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40'></div>
          </div>
          {subImages.map((subimg: SubImage, idx: number) => (
            <div key={subimg.id} className='full group relative cursor-pointer bg-[#b3b3b3]'>
              <Item
                original={mobileImages[idx + 1].url ?? undefined}
                thumbnail={mobileImages[idx + 1].url ?? undefined}
                width={600}
                height={380}
              >
                {({ ref, open }) => (
                  <ImageRef
                    ref={ref}
                    onClick={e => open(e)}
                    src={subimg.imageUrl!}
                    alt={`서브 이미지${subimg.id}`}
                    fill
                    className='object-cover'
                    unoptimized
                  />
                )}
              </Item>
              <div className='pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40'></div>
            </div>
          ))}
          {emptySlots > 0 &&
            Array.from({ length: emptySlots }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className='flex items-center justify-center bg-gray-300 text-gray-500'
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
      </Gallery>
    </>
  );
};

export default PostImage;
