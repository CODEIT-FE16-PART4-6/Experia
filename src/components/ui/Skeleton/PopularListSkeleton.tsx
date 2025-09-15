'use client';
import { BREAKPOINTS, POPULAR_ACTIVITIES_VIEW_COUNT } from '@/constants';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useEffect, useMemo, useState } from 'react';
import PopularItemSkeleton from './PopularItemSkeleton';

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return POPULAR_ACTIVITIES_VIEW_COUNT.lg;
  if (width >= BREAKPOINTS.md) return POPULAR_ACTIVITIES_VIEW_COUNT.md;
  return POPULAR_ACTIVITIES_VIEW_COUNT.sm;
};

const PopularListSkeleton = () => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState(() => getPageSize(innerWidth ?? 0));

  const skeletonItems = useMemo(
    () => Array.from({ length: pageSize }, (_, index) => <PopularItemSkeleton key={index} />),
    [pageSize],
  );

  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth));
  }, [innerWidth]);

  return (
    <section className='mb-[34px] max-w-[1200px]'>
      <ul className='flex gap-4'>{skeletonItems}</ul>
    </section>
  );
};

export default PopularListSkeleton;
