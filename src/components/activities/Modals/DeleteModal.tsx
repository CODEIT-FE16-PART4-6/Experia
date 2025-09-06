import { useState } from 'react';
import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface titleType {
  title: string;
  onClose: () => void;
  activityId: number;
  reDirectPage: string;
}

const DeleteModal = ({ title, onClose, activityId, reDirectPage }: titleType) => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleFetchDelete() {
    try {
      const token = localStorage.getItem('access_token');

      const res = await fetch(
        `https://sp-globalnomad-api.vercel.app/16-6/my-activities/${activityId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || '삭제 실패');
        return;
      }
      setMessage('삭제가 완료 하였습니다.');
    } catch (err) {
      setMessage('에러가 발생했습니다 !');
    }
  }
  const handleDeleteComplete = () => {
    onClose();
    router.push(reDirectPage);
  };

  return (
    <div className='sm:fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:static md:top-0 md:left-0 md:flex md:translate-0'>
      <div className='mt-[16px] flex w-100 flex-col justify-center gap-6 md:pl-6'>
        {!message ? (
          <>
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
            <div className='flex gap-3'>
              <Button className='w-65' onClick={handleFetchDelete}>
                예
              </Button>
              <Button className='w-65' onClick={onClose}>
                아니오
              </Button>
            </div>
          </>
        ) : (
          <div className='mt-4 flex flex-col justify-center gap-4 text-center'>
            <div>{message}</div>
            {message.includes('완료') ? (
              <div className='flex justify-center'>
                <Button className='ml-2 w-65' onClick={handleDeleteComplete}>
                  확인
                </Button>
              </div>
            ) : (
              <div className='flex justify-center'>
                <Button className='w-65' onClick={onClose}>
                  확인
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
