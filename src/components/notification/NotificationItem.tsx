import Image from 'next/image';
import clsx from 'clsx';
import { Notification } from '@/types/schema/notificationSchema';
import formatRelativeTime from '@/utils/formatter/formatRelativeTime';
import { useEffect } from 'react';

interface Props {
  item: Notification;
  isUnread?: boolean;
  onDelete: (id: number) => void;
}

const splitContent = (content: string) => {
  const contentArr = content.match(/(.*예약이 )(승인|거절)(되었습니다\.)$/);
  if (!contentArr) return;
  const [, prefix, status, suffix] = contentArr;
  return [prefix, status, suffix]; // [앞문장, status, 뒷문장]
};

const NotificationItem = ({ item, isUnread, onDelete }: Props) => {
  const splitted = splitContent(item.content) || '';

  return (
    <li className='noti-list'>
      {/* 🔵 알림 상태 표시: 읽지 않은 알림만 보여주기 */}
      <span
        className={clsx('mb-2 h-1.5 w-1.5 rounded-full', {
          'bg-blue-primary': splitted[1] === '승인',
          'bg-red-primary': splitted[1] === '거절',
          hidden: !isUnread, // ✅ 읽음이면 숨김
          'inline-block': isUnread, // ✅ 안읽음이면 보임
        })}
      ></span>

      <p className='text-md w-[90%] text-gray-900'>
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

      <span className='mt-1 text-xs text-gray-400'>{formatRelativeTime(item.updatedAt)}</span>

      <button
        type='button'
        aria-label='알림 삭제'
        className='absolute top-3 right-3'
        onClick={() => onDelete(item.id)}
      >
        <Image src='/icons/ic_Close.svg' alt='' width={20} height={20} />
      </button>
    </li>
  );
};

export default NotificationItem;
