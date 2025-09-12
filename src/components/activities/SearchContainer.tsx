'use client';

import { Suspense, useState } from 'react';
import PopularPageClient from './PopularPage.client';
import DropdownOptions from '@/components/DropdownOptions';
import MainPageClient from '@/components/activities/MainPage.client';
import SearchBarClient from '@/components/activities/SearchBar.client';
import CategoryMenu from '@/components/ui/CategoryMenu';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import ActivityListSkeleton from '@/components/ui/Skeleton/ActivityListSkeleton';
import PopularListSkeleton from '@/components/ui/Skeleton/PopularListSkeleton';
import { ACTIVITY_LIST_ORDER_OPTIONS } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';

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

      <section className='mx-auto mt-[34px] max-w-[1200px]'>
        <SectionTitle title='🔥 인기 체험' />
        {!keyword && (
          <Suspense fallback={<PopularListSkeleton />}>
            <PopularPageClient initialData={initialData} />
          </Suspense>
        )}

        {!keyword && <SectionTitle title='🌏 모든 체험' />}

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
      </section>
    </>
  );
}
