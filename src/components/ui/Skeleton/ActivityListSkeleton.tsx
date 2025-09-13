'use client';
import ActivityItemSkeleton from './ActivityItemSkeleton';

const ActivityListSkeleton = () => {
  const skeletonItems = Array.from({ length: 12 }, (_, index) => (
    <ActivityItemSkeleton key={index} />
  ));

  return (
    <>
      <section className='mx-auto mt-[34px] max-w-[1200px] px-4'>
        <ul className='mb-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
          {skeletonItems}
        </ul>
      </section>
    </>
  );
};

export default ActivityListSkeleton;
