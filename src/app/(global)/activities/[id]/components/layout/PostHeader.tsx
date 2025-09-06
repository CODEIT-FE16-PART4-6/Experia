'use client';
//img
import Image from 'next/image';
//comp
import { DropdownMeatball } from '@/components/DropdownMeatball';
import useModalStore from '@/stores/modalStore';
import DeleteModal from '@/components/activities/Modals/DeleteModal';

//hooks
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PostType {
  id: number;
  tag: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
  userId: number;
}

const PostHeader = ({ userId, id, tag, title, rating, reviewCount, address }: PostType) => {
  const router = useRouter();
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);
  const [isMyPost, setIsMyPost] = useState(false);

  useEffect(() => {
    const authStoreData = localStorage.getItem('auth-store');
    if (authStoreData) {
      try {
        const authStoreDataObj = JSON.parse(authStoreData);
        console.log('로컬스토리지 my id : ', authStoreDataObj.state.user.id);
        console.log('api 의 페이지 user ID', userId);
        if (authStoreDataObj.state.user.id === userId) {
          setIsMyPost(true);
        }
      } catch (error) {
        console.log('로컬 데이터(auth-store) 파싱도중 에러 발생');
      }
    }
  }, []); // 로컬 스토리지 => 클라이언트 사이드

  const handleDelete = () => {
    openModal(
      
      <DeleteModal
        reDirectPage={'/'} activityId={id} title={title}
        activityId={id}
        onClose={closeModal}
        onDeleteSuccess={() => {
          // 삭제 성공 시 홈 페이지로 이동
          router.replace('/');
        }}
      />,
    ,
    );
  }; // 삭제하기 버튼 클릭시

  const handleEdit = () => {
    router.push(`/mypage/my-activities/edit-activity/${id}`);
  }; // 수정하기 버튼 클릭시

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
        {isMyPost ? <DropdownMeatball onEdit={handleEdit} onDelete={handleDelete} /> : ''}
      </div>
    </div>
  );
};

export default PostHeader;
