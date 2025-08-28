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
