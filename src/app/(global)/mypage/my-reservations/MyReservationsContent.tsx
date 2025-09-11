'use client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import DropdownOptions from '@/components/DropdownOptions';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { RESERVATION_STATUS } from '@/constants';
import { ReservationResponseSchema } from '@/types/schema/reservationSchema';
import { ReservationType } from '@/types/schema/reservationSchema';
import fetchClientData from '@/utils/api-client/fetchClientData';

import ActivityCard from '../components/ActivityCard';

const fetchReservations = async () => {
  const response = await fetchClientData('/my-reservations?size=10', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const validatedData = ReservationResponseSchema.parse(response);
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
