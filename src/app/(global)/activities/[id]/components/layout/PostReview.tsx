import Image from 'next/image';

import CreateReview from '@/app/(global)/activities/[id]/components/review-block/CreateReview';
import ReviewList from '@/app/(global)/activities/[id]/components/review-block/ReviewList';
import { ReviewType } from '../postContentTypes';

interface ReviewContentType {
  totalCount: number;
  averageRating: number;
  reviews: ReviewType[];
}
interface ReviewData {
  reviewData: ReviewContentType;
}

const PostReview = ({ reviewData }: ReviewData) => {
  return (
    <div>
      <p className='text-nomad-black mb-[18px] pr-[24px] pl-[24px] text-[20px] font-bold lg:pr-0 lg:pl-0 lg:text-[18px]'>
        후기
      </p>
      <div className='flex flex-col pr-[24px] pl-[24px] lg:pr-0 lg:pl-0'>
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            <p className='text-nomad-black flex flex-col justify-center text-[50px] font-semibold'>
              {reviewData.averageRating}
            </p>
            <div className='flex flex-col justify-center gap-2'>
              <p className='text-nomad-black text-[18px]'>
                {reviewData.averageRating >= 4
                  ? '매우 만족'
                  : reviewData.averageRating >= 3
                    ? '만족'
                    : reviewData.averageRating >= 2
                      ? '보통'
                      : reviewData.averageRating >= 1
                        ? '복합적'
                        : reviewData.averageRating == 0
                          ? '리뷰 없음'
                          : '불만족'}
              </p>
              <div className='flex gap-[6px]'>
                <div className='flex flex-col justify-center'>
                  <Image
                    src='/icons/ActivityPageImgs/ic_Star.svg'
                    alt='별점 이미지'
                    width={16}
                    height={16}
                  />
                </div>
                {reviewData.totalCount}개 후기
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <CreateReview />
          </div>
        </div>
      </div>
      <div className='mb-10 pr-[24px] pl-[24px] lg:pr-0 lg:pl-0'>
        <ReviewList reviewData={reviewData} />
      </div>
      {/* 페이지네이션 컴포넌트 위치 */}
    </div>
  );
};

export default PostReview;
