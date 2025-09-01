'use client';

import KebabButton from '@/assets/imgs/activityPage/ic_Kebab.svg';
import MarkInMap from '@/assets/imgs/activityPage/ic_MarkInMap.svg';
import Star from '@/assets/imgs/activityPage/ic_Star.svg';
interface PostType {
  tag: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
}
const PostHeader = ({ tag, title, rating, reviewCount, address }: PostType) => {
  return (
    <div className='flex flex-row justify-between p-4 md:p-6 lg:mx-auto lg:w-[1200px]'>
      <div className='flex flex-col'>
        <div className='mb-[10px] text-[14px] text-gray-900'>{tag}</div>
        <div className='text-nomad-black mb-[16px] text-[24px] font-bold md:text-[32px]'>
          {title}
        </div>
        <div className='flex gap-3 text-[14px] text-gray-900'>
          <div className='flex gap-1'>
            <div className='flex flex-col justify-center'>
              <Star />
            </div>
            {rating}({reviewCount})
          </div>
          <div className='flex gap-[3px]'>
            <div className='flex flex-col justify-center gap-[3px]'>
              <MarkInMap />
            </div>
            <p className='text-nomad-black'>{address}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <button>
          <KebabButton />
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
