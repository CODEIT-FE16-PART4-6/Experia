'use client';

import { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';

import MyInfoForm from '@/app/(global)/mypage/components/MyInfoForm';
import Button from '@/components/Button';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { useUserStore } from '@/stores/userStore';
import { MyInfoFormValues } from '@/types/schema/myInfoFormSchema';
import fetchClientData from '@/utils/api-client/fetchClientData';

const MyInfoClient = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const updateUser = useUserStore(state => state.updateUser);

  const handleUpdateMyInfo: SubmitHandler<MyInfoFormValues> = async data => {
    try {
      // 비밀번호가 입력되지 않은 경우 제외하고 전송
      const updateData: {
        nickname: string;
        email: string;
        password?: string;
      } = {
        nickname: data.nickname,
        email: data.email,
      };

      if (data.password && data.password.trim()) {
        updateData.password = data.password;
      }

      const result = await fetchClientData(`/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      // 성공 시 userStore 업데이트
      if (result) {
        updateUser({
          nickname: data.nickname,
          email: data.email,
        });
        alert('정보가 성공적으로 수정되었습니다.');
      }
    } catch (err) {
      console.error('정보 수정 실패:', err);
      const errorMessage = err instanceof Error ? err.message : '정보 수정에 실패했습니다.';
      alert(errorMessage);
    }
  };

  const handleSubmitClick = () => {
    // 폼의 submit 이벤트를 트리거
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div>
      <SectionTitle
        title='내 정보'
        action={
          <Button variant='POSITIVE' size='md' onClick={handleSubmitClick}>
            수정하기
          </Button>
        }
      />
      <MyInfoForm onSubmit={handleUpdateMyInfo} ref={formRef} />
    </div>
  );
};
export default MyInfoClient;
