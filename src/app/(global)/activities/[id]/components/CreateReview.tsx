'use client';
//hooks
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { ReservationResponseSchema } from '@/types/schema/reservationSchema';
import useModalStore from '@/stores/modalStore';

const ReviewCreateModal = dynamic(() => import('@/components/review/ReviewCreateModal'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const fetchReservations = async () => {
  const response = await fetch('https://sp-globalnomad-api.vercel.app/16-6/my-reservations', {
    method: 'GET', // 또는 POST, PUT, DELETE 등 필요에 따라
    headers: {
      //임시 토큰값
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjI4MzI1NSwiZXhwIjoxNzU3NDkyODU1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.7f4EC3wcK_Zzpys7mDlyXshKz5MX-2mdlZ12gOrVoJA', //Bearer 뒤에 토큰 붙여서 전송
      'Content-Type': 'application/json', // 서버가 JSON 형식 데이터를 기대하는 경우
    },
  });
  const data = await response.json();
  const validatedData = ReservationResponseSchema.parse(data);
  return validatedData.reservations; //resevations 배열만 반환
};

const CreateReview = () => {
  const closeModal = useModalStore(state => state.closeModal);
  const openModal = useModalStore(state => state.openModal);
  const [toggleReviewCreate, setToggleReviewCreate] = useState(false);

  const params = useParams();
  const id = Number(params.id);

  const { data, error, isLoading } = useQuery({
    queryKey: ['reservationList'],
    queryFn: fetchReservations,
  });

  const reservations = data || [];

  const thisReview = useMemo(() => {
    if (!reservations.length) return null;

    const foundReservation = reservations.find(reservation => reservation.activity.id === id);

    console.log('찾은 예약:', foundReservation);
    return foundReservation || null;
  }, [reservations, id]);

  console.log('thisreview', thisReview);

  const reviewStatus = thisReview?.status === 'completed';

  const handleToggleReviewComponent = () => {
    if (!thisReview) {
      console.error('예약 정보가 없습니다');
      return;
    }

    openModal(<ReviewCreateModal data={thisReview} />);
  };

  if (error) {
    console.error('예약 정보 조회 실패:', error);
    return (
      <button
        disabled
        className='cursor-not-allowed rounded-[8px] bg-gray-400 px-[10px] py-[10px] text-[14px] font-bold text-white md:px-[20px] md:py-[12px] md:text-[16px] lg:px-[35px] lg:py-[15px]'
      >
        후기 작성하기
      </button>
    );
  }

  if (isLoading) {
    return (
      <button
        disabled
        className='cursor-not-allowed rounded-[8px] bg-gray-400 px-[10px] py-[10px] text-[14px] font-bold text-white md:px-[20px] md:py-[12px] md:text-[16px] lg:px-[35px] lg:py-[15px]'
      >
        ...
      </button>
    );
  }

  return (
    <>
      <button
        disabled={!reviewStatus}
        onClick={handleToggleReviewComponent}
        className='rounded-[8px] bg-[#112211] px-[10px] py-[10px] text-[14px] font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-400 md:px-[20px] md:py-[12px] md:text-[16px] lg:px-[35px] lg:py-[15px]'
      >
        후기 작성하기
      </button>
    </>
  );
};

export default CreateReview;
