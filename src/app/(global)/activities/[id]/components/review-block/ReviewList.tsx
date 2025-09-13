'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import defaultProfile from '@/assets/imgs/defaultProfile/default.png';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { ReviewType } from '../postContentTypes';
// import { resolveViewport } from 'next/dist/lib/metadata/resolve-metadata';

interface ReviewContentType {
  totalCount: number;
  averageRating: number;
  reviews: ReviewType[];
}
interface ReviewData {
  reviewData: ReviewContentType;
}
const fetchItems = async (page: number, id: string) => {
  const res = await fetch(
    `https://sp-globalnomad-api.vercel.app/16-6/activities/${id}/reviews?page=${page}&limit=2`,
    { next: { revalidate: 300, tags: ['activity_reviews_s'] } },
  );
  if (!res.ok) throw new Error('Fetch 실패');
  return res.json();
};

const ReviewList = ({ reviewData }: ReviewData) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const id = params.id;

  const formatDateFunction = (date: string) => {
    const updateTime = new Date(date);
    const year = updateTime.getFullYear();
    const month = String(updateTime.getMonth() + 1).padStart(2, '0');
    const day = String(updateTime.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery({
    queryKey: ['activity_reviews', id],
    queryFn: ({ pageParam = 1 }) => fetchItems(pageParam, id),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap(p => p.reviews).length;
      return loaded < lastPage.totalCount ? allPages.length + 1 : undefined;
    },
    initialData: {
      pages: [reviewData],
      pageParams: [1],
    },
  });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const allReviews = data?.pages.flatMap(p => p.reviews) ?? [];

  return (
    <ol>
      {allReviews.map((reviewContent, index) => (
        <li key={reviewContent.id}>
          {index !== 0 && <hr className='border-gray-400' />}
          <div className='my-[25px] flex gap-4'>
            <div className='over-hidden h-[45px] w-[45px] flex-shrink-0'>
              <Image
                alt='프로필 이미지'
                width={45}
                height={45}
                src={
                  reviewContent.user.profileImageUrl
                    ? reviewContent.user.profileImageUrl
                    : defaultProfile
                }
                className='h-full w-full rounded-[30px] object-cover'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-[4.5px]'>
                <p className='text-nomad-black text-[16px] font-bold'>
                  {reviewContent.user.nickname}
                </p>
                <div className='flex rounded-[13px] bg-[#ececec] px-[7px]'>
                  {Array.from({ length: 5 }, (_, index) => {
                    const currentStarIndex = index + 1;
                    let starSrc = '/icons/ActivityPageImgs/ic_StarEmpty.svg';

                    if (reviewContent.rating >= currentStarIndex) {
                      starSrc = '/icons/ActivityPageImgs/ic_Star.svg';
                    }

                    return (
                      <Image
                        key={index}
                        src={starSrc}
                        alt={`${currentStarIndex}번째 별점`}
                        width={13}
                        height={13}
                      />
                    );
                  })}
                </div>
                <p>|</p>
                <p className='text-gray-600'>{formatDateFunction(reviewContent.updatedAt)}</p>
              </div>
              <p className='text-nomad-black break-words'>{reviewContent.content}</p>
            </div>
          </div>
        </li>
      ))}
      <div ref={loadMoreRef}>
        {isFetchingNextPage && <p className='text-center text-gray-400'>불러오는 중...</p>}
        {isError && (
          <p className='pb-16 text-center'>
            목록 불러오기에 실패했습니다.
            <button className='ml-2 underline underline-offset-4' onClick={() => fetchNextPage()}>
              다시 시도
            </button>
          </p>
        )}
      </div>
    </ol>
  );
};

export default ReviewList;
