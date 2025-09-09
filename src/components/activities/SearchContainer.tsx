'use client'

import { Suspense, useState } from 'react'
import { Activities } from '@/types/schema/activitiesSchema'
import ActivityListSkeleton from '@/components/ui/Skeleton/ActivityListSkeleton'
import SearchBarClient from '@/components/activities/SearchBar.client' // 기존에 있으니 경로만 맞춰주세요
import MainPageClient from '@/components/activities/MainPage.client'   // 아래 3번 파일
import SectionTitle from '../ui/Section/SectionTitle'

type Props = {
  initialData: Activities
  initialKeyword?: string
}

export default function SearchContainer({ initialData, initialKeyword = '' }: Props) {
  const [keyword, setKeyword] = useState(initialKeyword)

  return (
    <>
      <SearchBarClient onSearch={setKeyword} initialQuery={keyword} />
      {!keyword && (
        <section className="mx-auto max-w-[1200px] mt-[34px] px-4">
          <SectionTitle title="🌏 모든 체험" />
        </section>
      )}

      <Suspense fallback={<ActivityListSkeleton />}>
        <MainPageClient initialData={initialData} keyword={keyword} />
      </Suspense>
    </>
  )
}