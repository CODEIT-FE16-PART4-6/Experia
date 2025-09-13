import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/Button';
import fetchClientData from '@/utils/api-client/fetchClientData';

interface titleType {
  title: string;
  activityId: number;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

const DeleteModal = ({ title, onClose, activityId, onDeleteSuccess }: titleType) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await fetchClientData(`/my-activities/${activityId}`, {
        method: 'DELETE',
      });
      onDeleteSuccess?.();
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className='sm:fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:static md:top-0 md:left-0 md:flex md:translate-0'>
      <div className='h-fill mt-[16px] flex w-100 flex-col justify-center gap-7 md:pl-6'>
        <div className='flex justify-between'>
          <div>
            <Image
              src='/icons/ActivityPageImgs/ic_CautionSign.svg'
              alt='주의마크'
              width={50}
              height={50}
            />
          </div>
          <div className='w-full self-center text-center'>
            <p className='font-bold'>{title}</p>
            체험 포스터를 <span className='text-[#df4040] underline'>삭제</span>하시겠습니까?
          </div>
        </div>
        <div className={`flex gap-3 ${isDeleting ? 'justify-center' : ''}`}>
          <Button className='w-65 disabled:hidden' onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '예'}
          </Button>
          <Button className='w-65 disabled:hidden' onClick={onClose} disabled={isDeleting}>
            아니오
          </Button>
          <div
            className={
              isDeleting ? 'block flex justify-center text-center text-gray-500' : 'hidden'
            }
          >
            삭제 중입니다...
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
