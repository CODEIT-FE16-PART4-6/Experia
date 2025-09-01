'use client';

//lib
import clsx from 'clsx';
import Image from 'next/image';
//SSR
//img
import imageArrowLeft from '@/assets/imgs/activityPage/imageArrowLeft.svg';
import imageArrowRight from '@/assets/imgs/activityPage/imageArrowRight.svg';

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
  const emptySlots = MAX_SUB_ITEMS - subImages.length;

  const tagName = new Map([
    ['문화 · 예술', 'culture'],
    ['식음료', 'foodNdrinks'],
    ['스포츠', 'sports'],
    ['투어', 'tour'],
    ['관광', 'sightseeing'],
    ['웰빙', 'wellbeing'],
  ]);
  const englishTag = tagName.get(tag) || 'default';
  console.log(englishTag);
  return (
    <div
      className={clsx(
        'h-[310px]',
        'md:grid',
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
  );
};

export default PostImage;
