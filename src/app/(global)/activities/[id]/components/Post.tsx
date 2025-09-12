import { z } from 'zod';

//downComponent

import PostContent from './layout/PostContent';
import PostHeader from './layout/PostHeader';
import PostImage from './layout/PostImage';
import ReservateIn from './reservation-block/reservateIn';
import ReservateMobile from './reservation-block/reservateMobileIn';
import { ActivityDetail, ActivityReview } from '@/types/schema/activitiesSchema';


type Activity = z.infer<typeof ActivityDetail>;
type ActivityReviewList = z.infer<typeof ActivityReview>;

interface ActivityProps {
  postData: Activity;
  reviewData: ActivityReviewList;
}

const ActivityPost = ({ postData, reviewData }: ActivityProps) => {
  const ActivityContent = {
    ...postData,
    tag: postData.category,
  };

  return (
    <main className='fill bg-[#fafafa]'>
      <PostHeader
        tag={ActivityContent.tag}
        title={ActivityContent.title}
        rating={ActivityContent.rating}
        reviewCount={ActivityContent.reviewCount}
        address={ActivityContent.address}
        id={ActivityContent.id}
        userId={ActivityContent.userId}
      />
      <PostImage
        bannerImageUrl={postData.bannerImageUrl}
        subImages={postData?.subImages || []}
        tag={ActivityContent.tag}
      />
      <div className='pb-[120px] md:mt-8 md:flex md:pr-[24px] lg:mx-auto lg:mt-[85px] lg:w-[1152px] lg:gap-6'>
        <div className='md:w-[100%] lg:w-[786px]'>
          <PostContent
            description={ActivityContent.description}
            address={ActivityContent.address}
            reviewData={reviewData}
          />
        </div>
        <div>
          <ReservateIn data={postData} />
        </div>
      </div>
      <div
        style={{ boxShadow: '0px -3px 10px 0px rgba(0, 0, 0, 0.3)' }}
        className='sticky bottom-0 h-[83px] w-full bg-white sm:block md:hidden lg:hidden'
      >
        <ReservateMobile data={postData} />
      </div>
    </main>
  );
};
export default ActivityPost;
