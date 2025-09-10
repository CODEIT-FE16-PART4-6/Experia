'use client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import DropdownOptions from '@/components/DropdownOptions';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { RESERVATION_STATUS } from '@/constants';
import { ReservationResponseSchema } from '@/types/schema/reservationSchema';
import { ReservationType } from '@/types/schema/reservationSchema';

import ActivityCard from '../components/ActivityCard';


const fetchReservations = async () => {
  const response = await fetch(
    'https://sp-globalnomad-api.vercel.app/16-6/my-reservations?size=10',
    {
      method: 'GET',
      headers: {
        //임시 토큰값
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjI4MzI1NSwiZXhwIjoxNzU3NDkyODU1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.7f4EC3wcK_Zzpys7mDlyXshKz5MX-2mdlZ12gOrVoJA',
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  const validatedData = ReservationResponseSchema.parse(data);
  return validatedData.reservations; //reservations 배열만 반환
};

const MyReservationsContent = () => {
  const searchParams = useSearchParams();
  const selectedStatus = searchParams.get('option');

  const { data, error, isLoading } = useQuery({
    queryKey: ['reservationList'],
    queryFn: fetchReservations,
  });

  // 필터링된 예약 목록
  const getFilteredReservations = () => {
    if (!data) return [];

    if (!selectedStatus) {
      return data; // 필터가 선택되지 않았으면 모든 예약 표시
    }

    return data.filter(reservation => reservation.status === selectedStatus);
  };

  const filteredReservations = getFilteredReservations();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <div className='min-h-screen'>
      <SectionTitle
        title='예약 내역'
        action={
          <DropdownOptions items={RESERVATION_STATUS} placeholderLabel='필터' type='filter' />
        }
      />
      <div className='flex flex-col gap-4'>
        {filteredReservations.map(reservation => (
          <ActivityCard
            key={reservation.id}
            type='reservation'
            data={reservation as ReservationType}
          />
        ))}
        {filteredReservations.length === 0 && (
          <div className='py-8 text-center text-gray-500'>
            {selectedStatus ? '선택한 필터에 해당하는 예약이 없습니다.' : '예약 내역이 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsContent;
