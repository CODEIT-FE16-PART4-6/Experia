import Star from '@/assets/imgs/activityPage/ic_Star.svg';
import Image from 'next/image';

interface ReviewUserType {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface ReviewType {
  id: number;
  user: ReviewUserType[];
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updtatedAt: string;
}

interface ReviewType {
  reviewTotalCount: number;
  averageRating: number;
  reviews: ReviewType[];
}

const PostReview = ({ reviewTotalCount, averageRating, reviews }: ReviewType) => {
  //********************************* 목데이터
  const MockReviewTotalCount = 10; //reviewTotalCount
  const MockAvarageRating = 3.2; //averageRating
  const MockReview = [
    {
      id: 1,
      user: {
        profileImageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
        nickname: '홍길동',
        id: 1,
      },
      activityId: 12,
      rating: 4.3,
      content: '리뷰 내용 1리뷰 내용 1리뷰 내용 1리뷰 내용 1리뷰 내용 1리뷰 내용 1',
      createdAt: '2025-08-29T18:38:08',
      updatedAt: '2025-08-29T18:38:08',
    },
    {
      id: 2,
      user: {
        profileImageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
        nickname: '강길동',
        id: 1,
      },
      activityId: 12,
      rating: 4.3,
      content:
        'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',
      createdAt: '2025-08-29T18:38:08',
      updatedAt: '2025-08-29T18:38:08',
    },
    {
      id: 3,
      user: {
        profileImageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
        nickname: '닉네임',
        id: 1,
      },
      activityId: 12,
      rating: 4.3,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      createdAt: '2025-08-29T18:38:08',
      updatedAt: '2025-08-29T18:38:08',
    },
  ];
  //*********************************** */
  const formatDateFunction = (date: string) => {
    const updateTime = new Date(date);
    const year = updateTime.getFullYear();
    const month = String(updateTime.getMonth() + 1).padStart(2, '0');
    const day = String(updateTime.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div>
      <p className='text-nomad-black mb-[18px] pr-[24px] pl-[24px] text-[20px] font-bold lg:text-[18px]'>
        후기
      </p>
      <div className='flex flex-col pr-[24px] pl-[24px]'>
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            <p className='text-nomad-black flex flex-col justify-center text-[50px] font-semibold'>
              {averageRating}
            </p>
            <div className='flex flex-col justify-center gap-2'>
              <p className='text-nomad-black text-[18px]'>매우 만족</p>
              <div className='flex gap-[6px]'>
                <div className='flex flex-col justify-center'>
                  <Star />
                </div>
                {reviewTotalCount}개 후기
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
      {MockReview.map((reviewContent, index) => (
        <div key={reviewContent.id}>
          {(index === 1 || index === 2) && <hr className='border-gray-400' />}
          <div className='my-[25px] flex gap-4 pr-[24px] pl-[24px]'>
            <div className='bg-nomad-black h-[45px] w-[45px] rounded-[30px]'>
              <Image alt='프로필 이미지' fill src={reviewContent.user.profileImageUrl} />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-[4.5px]'>
                <p className='text-nomad-black text-[16px] font-bold'>
                  {reviewContent.user.nickname}
                </p>
                <p>|</p>
                <p className='text-gray-600'>{formatDateFunction(reviewContent.updatedAt)}</p>
              </div>
              <p className='text-nomad-black'>{reviewContent.content}</p>
            </div>
          </div>
        </div>
      ))}
      {/* 페이지네이션 컴포넌트 위치 */}
    </div>
  );
};

export default PostReview;
