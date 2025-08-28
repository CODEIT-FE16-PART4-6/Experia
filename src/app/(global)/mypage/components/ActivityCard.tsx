import Image from 'next/image';
interface ActivityCardProps {
  reservation: {
    id: number;
    teamId: string;
    userId: number;
    activity: {
      bannerImageUrl: string;
      title: string;
      id: number;
    };
    scheduleId: number;
    status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
  };
}
/**{
 *
 * @returns 액티비티 1개 정보를 담고 있는 카드
 * @description 내 체험 관리, 예약 내역 페이지에서 사용
 */
const ActivityCard = ({ reservation }: ActivityCardProps) => {
  return (
    <div className='flex h-[128px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[156px] lg:h-[204px]'>
      <div className='relative h-[128px] w-[128px] md:h-[156px] md:w-[156px] lg:h-[204px] lg:w-[204px]'>
        <figure>
          <Image
            src={reservation.activity.bannerImageUrl}
            alt='액티비티 배너 사진'
            fill
            className='object-cover'
          />
        </figure>
      </div>
      <div className=''>
        <div>예약 {reservation.status}</div>
        <div>{reservation.activity.title}</div>

        <div className='flex gap-2'>
          <div>{reservation.date}</div>
          <span>·</span>
          <div>
            {reservation.startTime} - {reservation.endTime}
          </div>
          <span>·</span>
          <div>{reservation.headCount}명</div>
        </div>

        <div>₩ {reservation.totalPrice}</div>
      </div>
    </div>
  );
};
export default ActivityCard;

// //1. api 엔드포인트 파악 get https://sp-globalnomad-api.vercel.app/16-6/my-reservations?size=10
// //2. 쿼리함수 작성 fetch

// const fetchReservations = async () => {
//   const url = 'https://sp-globalnomad-api.vercel.app/16-6/my-reservations?size=10';

//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error('네트워크 응답이 올바르지 않습니다.');
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('데이터를 가져오는 중 오류 발생:', error);
//   }
// };

// //3. useQuery 작성

// const fetchReservations = async () => {
//   const res = await fetch('https://sp-globalnomad-api.vercel.app/16-6/my-reservations?size=10');
//   const data = await res.json();
//   const validatedData = ReservationResponseSchema.array().parse(data);

//   if (!res.ok) {
//     throw new Error('네트워크 응답이 올바르지 않습니다.');
//   }
//   return validatedData;

//   const { data, error, isLoading } = useQuery('reservations', fetchReservations);

//   if (isLoading) return <div>로딩중...</div>;
//   if (error) return <div>오류 발생: {error.message}</div>;

//   return (
//     <div>
//       {data.map(reservation => (
//         <ActivityCard key={reservation.id} reservation={reservation} />
//       ))}
//     </div>
//   );
// };

// 데이터는 부모 페이지에서 관리하고 props로 넘겨주기
// ActivityCard({ reservation })

//4. 데이터 타입 작성 zod
//5. UI 작성
//6. 반응형 처리
//7. 페이지네이션 처리
//8. 로딩, 에러 처리
