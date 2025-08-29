import { z } from 'zod';
import { cache } from 'react';
//downComponent
import PostHeader from './postHeader';
import PostImage from './postImage';
import PostContent from './postContent';
import ReservateIn from './reservateIn';
import { ActivityDetail } from '@/types/schema/activitiesSchema';

type Activity = z.infer<typeof ActivityDetail>;

interface ActivityProps {
  data: Activity;
}
const ActivityPost = ({ data }: ActivityProps) => {
  console.log('데이터 잘 받아왔나 테스트 타이틀 출력 : ', data.title);
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
