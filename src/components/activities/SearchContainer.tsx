'use client';

import { Suspense, useState, useRef } from 'react';
import { Activities } from '@/types/schema/activitiesSchema';
import ActivityListSkeleton from '@/components/ui/Skeleton/ActivityListSkeleton';
import SearchBarClient from '@/components/activities/SearchBar.client';
import MainPageClient from '@/components/activities/MainPage.client';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import CategoryMenu from '@/components/ui/CategoryMenu';
import DropdownOptions from '@/components/DropdownOptions';
import { ACTIVITY_LIST_ORDER_OPTIONS } from '@/constants';

type Props = {
  initialData: Activities;
  initialKeyword?: string;
};

export default function SearchContainer({ initialData, initialKeyword = '' }: Props) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string>('latest');

  return (
    <>
      <SearchBarClient onSearch={setKeyword} initialQuery={keyword} />

      {!keyword && (
        <section className='mx-auto mt-[34px] max-w-[1200px] px-4'>
          <SectionTitle title='🌏 모든 체험' />
        </section>
      )}

      <div className='mx-auto mt-4 flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4'>
        {/* 카테고리 필터 */}
        <div className='hide-scrollbar flex flex-1 touch-pan-x flex-nowrap items-center gap-2 overflow-x-auto'>
          <CategoryMenu selected={category} onChange={setCategory} />
        </div>

        {/* 정렬 드롭다운 */}
        <div className='ml-4 shrink-0'>
          <DropdownOptions
            items={ACTIVITY_LIST_ORDER_OPTIONS}
            type='order'
            placeholderLabel='최신순'
            onChange={setSort}
          />
        </div>
      </div>

      <Suspense fallback={<ActivityListSkeleton />}>
        <MainPageClient
          initialData={initialData}
          keyword={keyword}
          category={category}
          sort={sort}
        />
      </Suspense>
    </>
  );
}
