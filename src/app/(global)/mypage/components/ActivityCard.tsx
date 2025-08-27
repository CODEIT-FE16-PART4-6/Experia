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
  "cursorId": 0,
  "reservations": [
    {
      "id": 0,
      "teamId": "string",
      "userId": 0,
      "activity": {
        "bannerImageUrl": "string",
        "title": "string",
        "id": 0
      },
      "scheduleId": 0,
      "status": "pending",
      "reviewSubmitted": true,
      "totalPrice": 0,
      "headCount": 0,
      "date": "string",
      "startTime": "string",
      "endTime": "string",
      "createdAt": "2025-08-27T05:25:18.729Z",
      "updatedAt": "2025-08-27T05:25:18.729Z"
    }
  ],
 *
 * @returns 액티비티 1개 정보를 담고 있는 카드
 * @description 내 체험 관리, 예약 내역 페이지에서 사용
 */
const ActivityCard = ({ reservation }: ActivityCardProps) => {
  return (
    <div className='flex'>
      <div>
        <figure>체험배너{reservation.activity.bannerImageUrl}</figure>
      </div>
      <div className=''>
        <div>상태{reservation.status}</div>
        <div>제목{reservation.activity.title}</div>

        <div className='flex'>
          <div>날짜{reservation.date}</div>
          <div>시간{reservation.startTime}</div>
          <div>인원수{reservation.headCount}</div>
        </div>

        <div>가격{reservation.totalPrice}</div>
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
