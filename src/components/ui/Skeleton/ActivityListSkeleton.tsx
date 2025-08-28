import ActivityItemSkeleton from './ActivityItemSkeleton';

const ActivityListSkeleton = () => {
  const skeletonItems = Array.from({ length: 12 }, (_, index) => (
    <ActivityItemSkeleton key={index} />
  ));

  return (
    <ul className='mb-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>{skeletonItems}</ul>
  );
};

export default ActivityListSkeleton;
