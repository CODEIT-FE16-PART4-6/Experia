import { z } from 'zod';

//downComponent
import PostHeader from './postHeader';
import PostImage from './postImage';
import PostContent from './postContent';
import ReservateIn from './reservateIn';
import { ActivityDetail } from '@/types/schema/activitiesSchema';
import { ActivityReview } from '@/types/schema/activitiesSchema';

type Activity = z.infer<typeof ActivityDetail>;
type ActivityReviewList = z.infer<typeof ActivityReview>;

interface ActivityProps {
  data: Activity;
}
interface ActivityReviewProps {
  reviewData: ActivityReviewList;
}

const ActivityPost = ({ data, reviewData }: ActivityProps & ActivityReviewProps) => {
  console.log('데이터 잘 받아왔나 테스트 리뷰 객체 출력 : ', reviewData);
  const ActivityContent = {
    tag: data.category,
    title: data.title,
    rating: data.rating,
    reviewCount: data.reviewCount,
    address: data.address,
    description: data.description,
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
            reviewTotalCount={reviewData.totalCount}
            averageRating={reviewData.averageRating}
            reviews={reviewData.reviews}
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
