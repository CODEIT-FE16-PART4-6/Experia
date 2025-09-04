'use client';
//img
import Image from 'next/image';
//comp
import { DropdownMeatball } from '@/components/DropdownMeatball';
import useModalStore from '@/stores/modalStore';

//util
import { useRouter } from 'next/navigation';
import DeleteModal from '@/components/activities/Modals/DeleteModal';

interface PostType {
  id: number;
  tag: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
}

const PostHeader = ({ id, tag, title, rating, reviewCount, address }: PostType) => {
  const router = useRouter();
  const openModal = useModalStore(state => state.openModal);
  const handleDelete = () => {
    openModal(<DeleteModal title={title} />);
  };

  const handleEdit = () => {
    router.push(`/mypage/my-activities/edit-activity/${id}`);
  };

  return (
    <div className='flex flex-row justify-between p-4 md:p-6 lg:mx-auto lg:w-[1200px]'>
      <div className='flex flex-col'>
        <div className='mb-[10px] text-[14px] text-gray-900'>{tag}</div>
        <div className='text-nomad-black mb-[16px] text-[24px] font-bold md:text-[32px]'>
          {title}
        </div>
        <div className='flex gap-3 text-[14px] text-gray-900'>
          <div className='flex gap-1'>
            <div className='flex flex-col justify-center'>
              <Image
                src='/icons/ActivityPageImgs/ic_Star.svg'
                alt='별점 이미지'
                width={16}
                height={16}
              />
            </div>
            {rating}({reviewCount})
          </div>
          <div className='flex gap-[3px]'>
            <div className='flex flex-col justify-center gap-[3px]'>
              <Image
                src='/icons/ActivityPageImgs/ic_MarkInMap.svg'
                alt='맵마크 이미지'
                width={12}
                height={16}
              />
            </div>
            <p className='text-nomad-black'>{address}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <DropdownMeatball onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default PostHeader;
