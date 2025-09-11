'use client';

import { PopularActivities } from '@/types/schema/activitiesSchema';
import { InfiniteData } from '@tanstack/react-query';
import PopularItem from './PopularItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { BREAKPOINTS } from '@/constants';

interface PopularListProps {
  data: InfiniteData<PopularActivities, string | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const PopularList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PopularListProps) => {
  const isFetchingMore = hasNextPage && isFetchingNextPage;
  return (
    <div className='relative'>
      <Swiper
        slidesPerView={1} // 모바일 기본
        spaceBetween={16} // 슬라이드 간격
        breakpoints={{
          [BREAKPOINTS.md]: { slidesPerView: 2 }, // 720px 이상
          [BREAKPOINTS.lg]: { slidesPerView: 3 }, // 1280px 이상
        }}
        navigation // 좌우 버튼
        grabCursor // 마우스 드래그 가능
        modules={[Navigation]} // Swiper 모듈 등록
        onReachEnd={() => {
          if (hasNextPage) fetchNextPage();
        }}
      >
        {data.pages.map(page =>
          page.activities.map(activity => (
            <SwiperSlide key={activity.id}>
              <PopularItem item={activity} />
            </SwiperSlide>
          )),
        )}
        {isFetchingMore && (
          <SwiperSlide className='flex w-auto items-center justify-center'>
            <LoadingSpinner />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default PopularList;
