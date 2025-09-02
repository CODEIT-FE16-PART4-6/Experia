import Image from 'next/image';
import { ReviewType } from './postContentTypes';
import defaultProfile from '@/assets/imgs/defaultProfile/default.png';

interface ReviewContentType {
  totalCount: number;
  averageRating: number;
  reviews: ReviewType[];
}
interface ReviewData {
  reviewData: ReviewContentType;
}

const PostReview = ({ reviewData }: ReviewData) => {
  const formatDateFunction = (date: string) => {
    const updateTime = new Date(date);
    const year = updateTime.getFullYear();
    const month = String(updateTime.getMonth() + 1).padStart(2, '0');
    const day = String(updateTime.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

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
            <button className='rounded-[8px] bg-[#112211] px-[10px] py-[10px] text-[14px] font-bold text-white md:px-[20px] md:py-[12px] md:text-[16px] lg:px-[35px] lg:py-[15px]'>
              후기 작성하기
            </button>
          </div>
        </div>
      </div>
      <div className='mb-10 pr-[24px] pl-[24px] lg:pr-0 lg:pl-0'>
        <ol>
          {reviewData.reviews.map((reviewContent, index) => (
            <li key={reviewContent.id}>
              {(index === 1 || index === 2) && <hr className='border-gray-400' />}
              <div className='my-[25px] flex gap-4'>
                <div className='over-hidden h-[45px] w-[45px]'>
                  <Image
                    alt='프로필 이미지'
                    width={45}
                    height={45}
                    src={
                      reviewContent.user.profileImageUrl
                        ? reviewContent.user.profileImageUrl
                        : defaultProfile
                    }
                    className='rounded-[30px]'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-[4.5px]'>
                    <p className='text-nomad-black text-[16px] font-bold'>
                      {reviewContent.user.nickname}
                    </p>
                    <p>|</p>
                    <p className='text-gray-600'>{formatDateFunction(reviewContent.updatedAt)}</p>
                  </div>
                  <p className='text-nomad-black break-words'>{reviewContent.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* 페이지네이션 컴포넌트 위치 */}
    </div>
  );
};

export default PostReview;
