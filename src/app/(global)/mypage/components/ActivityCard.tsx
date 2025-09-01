import Image from 'next/image';
import { ReservationType } from '@/types/schema/reservationSchema';
import { ActivityType } from '@/types/schema/activitiesSchema';
interface ActivityCardProps {
  data: ReservationType | ActivityType;
  type: 'reservation' | 'activity';
}
const RESERVATION_STATUS = {
  pending: '예약 신청',
  canceled: '예약 취소',
  confirmed: '예약 승인',
  declined: '예약 거절',
  completed: '체험 완료',
};
/**
 *
 * @returns 액티비티 1개 정보를 담고 있는 카드
 * @description my-activities, my-reservations 페이지에서 사용
 */
const ActivityCard = ({ data, type }: ActivityCardProps) => {
  if (type === 'reservation') {
    const reservation = data as ReservationType;

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
          <div>{RESERVATION_STATUS[reservation.status]}</div>
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
  } else if (type === 'activity') {
    const activity = data as ActivityType;

    return (
      <div className='flex h-[128px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[156px] lg:h-[204px]'>
        <div className='relative h-[128px] w-[128px] md:h-[156px] md:w-[156px] lg:h-[204px] lg:w-[204px]'>
          <figure>
            <Image
              src={activity.bannerImageUrl}
              alt='액티비티 배너 사진'
              fill
              className='object-cover'
            />
          </figure>
        </div>
        <div className=''>
          <div>{activity.rating}</div>
          <div>{activity.title}</div>
          <div>₩ {activity.price}/인</div>
        </div>
      </div>
    );
  }
};
export default ActivityCard;
