//hooks

//img
import Image from 'next/image';

//comp
import PostMap from '@/app/(global)/activities/[id]/components/map-block/PostMapWrapper';
//types
import { ReviewType } from '@/app/(global)/activities/[id]/components/postContentTypes';

import PostReview from './PostReview';

interface ReviewContentType {
  totalCount: number;
  averageRating: number;
  reviews: ReviewType[];
}
interface ReviewData {
  reviewData: ReviewContentType;
}

interface ContentProps {
  description: string;
  address: string;
}

const PostContent = ({ description, address, reviewData }: ContentProps & ReviewData) => {
  return (
    <>
      <hr className='hidden md:mb-10 md:block md:border-gray-400 lg:mb-10 lg:border-gray-400' />
      <div className='justify-left mt-[15px] mb-[16px] flex flex-col gap-4 pr-[24px] pl-[24px] lg:p-[0px]'>
        <div className='text-nomad-black text-[20px] font-bold'>체험 설명</div>
        <div className='text-nomad-black mb-4'>{description}</div>
      </div>
      <hr className='mx-6 mb-4 border-gray-400 md:mx-[0px] md:my-10 lg:mx-[0px] lg:my-10'></hr>
      <div className='mt-[15px] mr-[24px] mb-[40px] ml-[24px] lg:mr-[0px] lg:ml-[0px]'>
        <div className='flex flex-col gap-[3px]'>
          <div
            className='relative mb-2 h-[450px] overflow-hidden rounded-[20px] bg-[#b3b3b3] md:h-[276px] lg:h-[450px] lg:w-[790px]'
            style={{ boxShadow: '2.5px 2.5px 5px rgba(0, 0, 0, 0.2)' }}
          >
            <PostMap address={address} />
          </div>
          <div className='flex gap-[5px]'>
            <div className='ml-[5px] flex flex-col justify-center gap-[3px]'>
              <Image
                src='/icons/ActivityPageImgs/ic_MarkInMap.svg'
                alt='맵 마크 이미지'
                width={12}
                height={16}
              />
            </div>
            <p className='text-nomad-black text-[14px]'>{address}</p>
          </div>
        </div>
      </div>
      <hr className='hidden md:mt-10 md:mb-10 md:block md:border-gray-400' />
      <PostReview reviewData={reviewData} />
    </>
  );
};

export default PostContent;
