'use client';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import ActivityCard from '../components/ActivityCard';
import { useQuery } from '@tanstack/react-query';
import { ReservationResponseSchema } from '@/types/schema/reservationSchema';

const fetchReservations = async () => {
  const response = await fetch(
    'https://sp-globalnomad-api.vercel.app/16-6/my-reservations?size=10',
    {
      method: 'GET', // 또는 POST, PUT, DELETE 등 필요에 따라
      headers: {
        //임시 토큰값
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjI4MzI1NSwiZXhwIjoxNzU3NDkyODU1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.7f4EC3wcK_Zzpys7mDlyXshKz5MX-2mdlZ12gOrVoJA', //Bearer 뒤에 토큰 붙여서 전송
        'Content-Type': 'application/json', // 서버가 JSON 형식 데이터를 기대하는 경우
      },
    },
  );
  const data = await response.json();
  const validatedData = ReservationResponseSchema.parse(data);
  return validatedData.reservations; //resevations 배열만 반환
};

const page = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['reservationList'],
    queryFn: fetchReservations,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  const reservations = data || [];

  return (
    <div className='min-h-screen'>
      <SectionTitle title='예약 내역' />
      <div className='flex flex-col gap-4'>
        {reservations.map(res => (
          <ActivityCard key={res.id} reservation={res} />
        ))}
      </div>
    </div>
  );
};
export default page;
