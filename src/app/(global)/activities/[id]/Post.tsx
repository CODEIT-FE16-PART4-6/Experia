import { z } from 'zod';

//downComponent
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostContent from './PostContent';
import ReservateIn from './reservateIn';
import { ActivityDetail, ActivityReview } from '@/types/schema/activitiesSchema';

type Activity = z.infer<typeof ActivityDetail>;
type ActivityReviewList = z.infer<typeof ActivityReview>;

interface ActivityProps {
  data: Activity;
  reviewData: ActivityReviewList;
}

const ActivityPost = ({ data, reviewData }: ActivityProps) => {
  const ActivityContent = {
    ...data,
    tag: data.category,
  };

  return (
    <main className='fill bg-[#fafafa]'>
      <PostHeader
        tag={ActivityContent.tag}
        title={ActivityContent.title}
        rating={ActivityContent.rating}
        reviewCount={ActivityContent.reviewCount}
        address={ActivityContent.address}
      />
      <PostImage
        bannerImageUrl={data.bannerImageUrl}
        subImages={data?.subImages || []}
        tag={ActivityContent.tag}
      />
      <div className='mt-8 flex md:pr-[24px] lg:mx-auto lg:mt-[85px] lg:w-[1152px] lg:gap-6'>
        <div className='md:w-[100%] lg:w-[786px]'>
          <PostContent
            description={ActivityContent.description}
            address={ActivityContent.address}
            reviewData={reviewData}
          />
        </div>
        <div>
          <ReservateIn />
        </div>
      </div>
    </main>
  );
};
export default ActivityPost;
