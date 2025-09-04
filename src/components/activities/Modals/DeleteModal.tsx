import Button from '@/components/Button';

interface titleType {
  title: string;
  onClose: () => void;
}

const DeleteModal = ({ title, onClose }: titleType) => {
  return (
    <div className='sm:fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:static md:top-0 md:left-0 md:flex md:translate-0'>
      <div className='mt-[16px] flex w-100 flex-col justify-center gap-6 md:pl-6'>
        <p className='text-center'>
          <p className='font-bold'>{title}</p>
          체험 포스터를 삭제하시겠습니까?
        </p>
        <div className='flex gap-3'>
          <Button className='w-65'>예</Button>
          <Button className='w-65' onClick={onClose}>
            아니오
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
