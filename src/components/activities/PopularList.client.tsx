'use client';

import { PopularActivities } from '@/types/schema/activitiesSchema';
import { InfiniteData } from '@tanstack/react-query';
import PopularItem from './PopularItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BREAKPOINTS, POPULAR_ACTIVITIES_VIEW_COUNT } from '@/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import 'swiper/css';
import 'swiper/css/navigation';

interface PopularListProps {
  data: InfiniteData<PopularActivities, string | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const PopularList = ({ data, fetchNextPage, hasNextPage, isFetchingNextPage }: PopularListProps) => {
  const isFetchingMore = hasNextPage && isFetchingNextPage;
  return (
    <div className='relative'>
      <Swiper
        slidesPerView={POPULAR_ACTIVITIES_VIEW_COUNT.sm} // 모바일 기본
        spaceBetween={16} // 슬라이드 간격
        breakpoints={{
          [BREAKPOINTS.md]: { slidesPerView: POPULAR_ACTIVITIES_VIEW_COUNT.md }, // 720px 이상
          [BREAKPOINTS.lg]: { slidesPerView: POPULAR_ACTIVITIES_VIEW_COUNT.lg }, // 1280px 이상
        }}
        navigation  // 좌우 버튼
        grabCursor  // 마우스 드래그 가능
        modules={[Navigation]}  // Swiper 모듈 등록
        onReachEnd={() => {
          if (hasNextPage) fetchNextPage()
        }}
      >
        {data.pages.map(page =>
          page.activities.map(activity => (
            <SwiperSlide key={activity.id}>
              <PopularItem item={activity} />
            </SwiperSlide>
          ))
        )}
        {isFetchingMore && (
          <SwiperSlide className='w-auto flex items-center justify-center'>
            <LoadingSpinner />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default PopularList;