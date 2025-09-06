'use client';
import ActivityItemSkeleton from './ActivityItemSkeleton';
import SectionTitle from '../Section/SectionTitle';

const ActivityListSkeleton = () => {
  const skeletonItems = Array.from({ length: 12 }, (_, index) => (
    <ActivityItemSkeleton key={index} />
  ));

  return (
    <>
      <section className="mx-auto max-w-[1200px] mt-[34px] px-4">
        <SectionTitle title="🌏 모든 체험" />
        <ul className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {skeletonItems}
        </ul>
      </section>
    </>
  );
};

export default ActivityListSkeleton;