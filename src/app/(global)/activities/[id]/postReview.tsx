import Star from '@/assets/imgs/activityPage/ic_Star.svg';

interface ReviewType {
  reviewCount: number;
  rating: number;
}

const PostReview = ({ reviewCount = 0, rating = 0 }: ReviewType) => {
  return (
    <div className='pr-[24px] pl-[24px]'>
      <p className='text-nomad-black mb-[18px] text-[20px] font-bold lg:text-[18px]'>후기</p>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            <p className='text-nomad-black flex flex-col justify-center text-[50px] font-semibold'>
              {rating}
            </p>
            <div className='flex flex-col justify-center gap-2'>
              <p className='text-nomad-black text-[18px]'>매우 만족</p>
              <div className='flex gap-[6px]'>
                <div className='flex flex-col justify-center'>
                  <Star />
                </div>
                {reviewCount}개 후기
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
    </div>
  );
};

export default PostReview;
