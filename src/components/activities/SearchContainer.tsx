'use client'

import { Suspense, useState } from 'react'
import { Activities } from '@/types/schema/activitiesSchema'
import ActivityListSkeleton from '@/components/ui/Skeleton/ActivityListSkeleton'
import SearchBarClient from '@/components/activities/SearchBar.client'
import MainPageClient from '@/components/activities/MainPage.client'
import SectionTitle from '../ui/Section/SectionTitle'
import PopularPageClient from './PopularPage.client'

type Props = {
  initialData: Activities
  initialKeyword?: string
}

export default function SearchContainer({ initialData, initialKeyword = '' }: Props) {
  const [keyword, setKeyword] = useState(initialKeyword)

  return (
    <>
      <SearchBarClient onSearch={setKeyword} initialQuery={keyword} />

      <section className="mx-auto max-w-[1200px] mt-[34px]">
        {!keyword && (
          <>
            <Suspense fallback={<ActivityListSkeleton />}>
              <SectionTitle title="🔥 인기 체험" />
              <PopularPageClient initialData={initialData} />
            </Suspense>
          </>
        )}

        {!keyword && (<SectionTitle title="🌏 모든 체험" />)}

        <Suspense fallback={<ActivityListSkeleton />}>
          <MainPageClient initialData={initialData} keyword={keyword} />
        </Suspense>
      </section>
    </>
  )
}