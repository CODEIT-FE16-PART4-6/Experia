'use client';
import PopularItemSkeleton from './PopularItemSkeleton';

const PopularListSkeleton = () => {
  const skeletonItems = Array.from({ length: 3 }, (_, index) => (
    <PopularItemSkeleton key={index} />
  ));

  return (
    <section className='mb-[34px] max-w-[1200px]'>
      <ul className='flex gap-4'>{skeletonItems}</ul>
    </section>
  );
};

export default PopularListSkeleton;
