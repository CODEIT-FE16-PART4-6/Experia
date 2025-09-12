'use client';

import PopularPageClient from '@/components/activities/PopularPage.client';
import { Suspense, useState } from 'react';
import DropdownOptions from '@/components/DropdownOptions';
import MainPageClient from '@/components/activities/MainPage.client';
import SearchBarClient from '@/components/activities/SearchBar.client';
import CategoryMenu from '@/components/ui/CategoryMenu';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import ActivityListSkeleton from '@/components/ui/Skeleton/ActivityListSkeleton';
import { ACTIVITY_LIST_ORDER_OPTIONS } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';

type Props = {
  initialData: Activities;
  popularInitialData: Activities;
  initialKeyword?: string;
};

const SearchContainer = ({ initialData, popularInitialData, initialKeyword = '' }: Props) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string>('latest');

  return (
    <>
      <SearchBarClient onSearch={setKeyword} initialQuery={keyword} />

      <section className='mx-auto mt-[34px] max-w-[1200px]'>
        {!keyword && (
          <>
            <SectionTitle title='🔥 인기 체험' />
            <Suspense fallback={<ActivityListSkeleton />}>
              <PopularPageClient initialData={popularInitialData} />
            </Suspense>
          </>
        )}

        {!keyword && (<SectionTitle title='🌏 모든 체험' />)}

        {!keyword && (
          <div className='mx-auto mt-4 flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 lg:px-0'>
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
        )}

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

export default SearchContainer;