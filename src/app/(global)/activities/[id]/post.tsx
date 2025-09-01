import { z } from 'zod';

//downComponent
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostContent from './PostContent';
import ReservateIn from './reservateIn';
import { ActivityDetail } from '@/types/schema/activitiesSchema';
import { ReviewType } from './PostContentTypes';

type Activity = z.infer<typeof ActivityDetail>;

interface ReviewConentType {
  totalCount: number;
  averageRating: number;
  reviews: ReviewType[];
}
interface ReviewData {
  reviewData: ReviewConentType;
}

interface ActivityProps {
  data: Activity;
  reviewData: ReviewData;
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
      <PostImage bannerImageUrl={data.bannerImageUrl} subImages={data?.subImages || []} />
      <div className='mt-8 flex md:pr-[24px] lg:mx-auto lg:mt-[85px] lg:w-[1152px] lg:gap-6'>
        <div className='lg:w-[786px]'>
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
