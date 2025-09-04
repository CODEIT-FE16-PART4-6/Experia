import Image from 'next/image';
import Link from 'next/link';
import { ReservationType } from '@/types/schema/reservationSchema';
import { ActivityType } from '@/types/schema/activitiesSchema';
import StarIcon from '@/assets/icons/ic_StarSmall.svg';
import Button from '@/components/Button';
import ReviewCreateModal from '@/components/review/ReviewCreateModal';
import useModalStore from '@/stores/modalStore';

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
  const openModal = useModalStore(state => state.openModal);

  if (type === 'reservation') {
    const reservation = data as ReservationType;

    return (
      <div className='flex h-[128px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[156px] lg:h-[204px]'>
        <figure className='relative h-[128px] w-[128px] shrink-0 md:h-[156px] md:w-[156px] lg:h-[204px] lg:w-[204px]'>
          <Image
            src={reservation.activity.bannerImageUrl}
            alt='액티비티 배너 사진'
            fill
            className='object-cover'
          />
        </figure>

        <div className='flex w-full flex-col gap-4 px-5 py-6'>
          <div className='flex flex-col gap-2'>
            <span className='text-base font-bold'>{RESERVATION_STATUS[reservation.status]}</span>
            <h5 className='text-xl font-bold'>{reservation.activity.title}</h5>
            <span className='text-lg text-gray-800'>
              {reservation.date} · {reservation.startTime} - {reservation.endTime} ·{' '}
              {reservation.headCount}명
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <h4 className='text-2xl font-medium'>₩{reservation.totalPrice}</h4>

            {reservation.status === 'pending' && (
              <Button size='sm' className='w-auto px-3.5 md:px-6 lg:px-[42px]'>
                예약 취소
              </Button>
            )}

            {reservation.status === 'completed' && (
              <Button
                size='sm'
                variant='POSITIVE'
                className='w-auto px-3.5 md:px-6 lg:px-[42px]'
                onClick={() => openModal(<ReviewCreateModal data={reservation} />)}
              >
                후기 작성
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  } else if (type === 'activity') {
    const activity = data as ActivityType;

    return (
      <Link
        href={`/mypage/my-activities/edit-activity/${data.id}`}
        className='flex h-[128px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[156px] lg:h-[204px]'
      >
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
          <StarIcon />
          <div>{activity.rating}</div>
          <div>({activity.reviewCount})</div>
          <div>{activity.title}</div>
          <div>₩ {activity.price}/인</div>
        </div>
      </Link>
    );
  }
};
export default ActivityCard;
