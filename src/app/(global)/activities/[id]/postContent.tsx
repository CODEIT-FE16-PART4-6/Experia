//hooks

//img
import MarkInMap from '@/assets/imgs/activityPage/ic_MarkInMap.svg';
import PostReview from './PostReview';
//types
import { ReviewType } from './PostContentTypes';

interface ReviewConentType {
  totalCount: number;
  averageRating: number;
  reviews: ReviewType[];
}
interface ReviewData {
  reviewData: ReviewConentType;
}

interface ContentProps {
  description: string;
  address: string;
  reviewData: ReviewData;
}
const PostContent = ({ description, address, reviewData }: ContentProps) => {
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
          <div className='mb-2 h-[450px] rounded-[20px] bg-[#b3b3b3] md:h-[276px] lg:h-[450px] lg:w-[790px]'>
            mapLocation
          </div>
          <div className='flex gap-[5px]'>
            <div className='ml-[5px] flex flex-col justify-center gap-[3px]'>
              <MarkInMap />
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
