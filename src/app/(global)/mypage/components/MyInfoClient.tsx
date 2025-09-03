'use client';

import SectionTitle from '@/components/ui/Section/SectionTitle';
import MyInfoForm from '@/app/(global)/mypage/components/MyInfoForm';
import Button from '@/components/Button';
import axios from 'axios';
import apiAuth from '@/utils/axios/apiAuth';

const MyInfoClient = () => {
  const handleUpdateMyInfo = async () => {
    try {
      const res = await apiAuth.patch('/users/me', {
        nickname: 'aaa',
        profileImageUrl: null,
        newPassword: '123123123',
      });
      const data = res.data;
      console.log(data);
      alert('내정보 수정 완료');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <SectionTitle
        title='내 정보'
        action={
          <Button variant='POSITIVE' size='md' onClick={handleUpdateMyInfo}>
            수정하기
          </Button>
        }
      />
      <MyInfoForm />
    </div>
  );
};
export default MyInfoClient;
