'use client';

import { Suspense, useState } from 'react';
import { Activities } from '@/types/schema/activitiesSchema';
import ActivityListSkeleton from '@/components/ui/Skeleton/ActivityListSkeleton';
import SearchBarClient from '@/components/activities/SearchBar.client';
import MainPageClient from '@/components/activities/MainPage.client';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import CategoryMenu from '@/components/ui/CategoryMenu';
import DropdownOptions from '@/components/DropdownOptions';

type Props = {
  initialData: Activities;
  initialKeyword?: string;
};

export default function SearchContainer({ initialData, initialKeyword = '' }: Props) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<'priceAsc' | 'priceDesc' | null>(null);

  return (
    <>
      <SearchBarClient onSearch={setKeyword} initialQuery={keyword} />

      {!keyword && (
        <section className='mx-auto mt-[34px] max-w-[1200px] px-4'>
          <SectionTitle title='🌏 모든 체험' />
        </section>
      )}

      <CategoryMenu selected={category} onChange={setCategory} />
      {/* <DropdownOptions selected={sort} onChange={setSort} /> */}

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
