import Image from 'next/image';
import clsx from 'clsx';
import { Notification } from '@/types/schema/notificationSchema';

interface Props {
  item: Notification;
}

const splitContent = (content: string) => {
  const contentArr = content.match(/(.*예약이 )(승인|거절|취소|완료)(되었습니다\.)$/);
  if (!contentArr) return;
  return [contentArr[1], contentArr[2], contentArr[3]]; // [앞문장, status, 뒷문장]
};

const NotificationItem = ({ item }: Props) => {
  const splitted = splitContent(item.content) || '';

  return (
    <li className='noti-list'>
      <span
        className={clsx('mb-2 inline-block h-1.5 w-1.5 rounded-full', {
          'bg-blue-primary': splitted[1] === '승인',
          'bg-red-primary': splitted[1] === '거절',
        })}
      ></span>
      <p className='text-md text-gray-900'>
        {splitted[0]}
        <b
          className={clsx({
            'text-blue-primary': splitted[1] === '승인',
            'text-red-primary': splitted[1] === '거절',
          })}
        >
          {splitted[1]}
        </b>
        {splitted[2]}
      </p>
      <span className='mt-1 text-xs text-gray-400'>1분 전</span>
      <button type='button' className='absolute top-3 right-3'>
        <Image src='/icons/ic_Close.svg' alt='알림 삭제' width={20} height={20} />
      </button>
    </li>
  );
};

export default NotificationItem;
