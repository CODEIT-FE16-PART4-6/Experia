'use client';

import InputField from '@/components/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StarRating } from '@/components/StarRating';
import { useState } from 'react';

// 폼 데이터 타입 정의
interface LoginFormInputs {
  email: string;
  nickname: string;
  password: string;
}

export default function Home() {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    console.log(data);
  };

  return (
    <main>
      <div>
        <StarRating value={rating} onChange={setRating} />
        <div> 현재 별점 : {rating}</div>
      </div>
      반응형, 컬러 시스템 테스트
      <div className='bg-primary md:bg-green lg:bg-yellow h-6 w-full md:mx-5 md:w-[400px] lg:w-[1200px]'></div>
      <h2 className='text-4xl font-bold text-black'>폰트 테스트</h2>
      <h3 className='text-primary-dark text-3xl font-bold'>폰트 테스트</h3>
      <h4 className='text-red-primary text-2xl font-semibold'>폰트 테스트</h4>
      <h5 className='text-orange text-xl font-medium'>폰트 테스트</h5>
      <h6 className='text-green text-lg'>폰트 테스트</h6>
      <p className='text-base text-black'>폰트 테스트</p>
      <h2 className='mb-6 text-4xl font-bold'>로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7'>
        <InputField
          label='이메일'
          placeholder='이메일 입력'
          type='email'
          autoComplete='email'
          {...register('email', { required: '이메일을 입력해주세요' })}
          error={errors.email?.message}
        />
        <InputField
          label='닉네임'
          placeholder='닉네임 입력'
          type='text'
          autoComplete='name'
          {...register('nickname', { required: '닉네임을 입력해주세요' })}
          error={errors.nickname?.message}
        />
        <InputField
          label='비밀번호'
          placeholder='비밀번호 입력'
          type='password'
          autoComplete='current-password'
          {...register('password', { required: '비밀번호를 입력해주세요' })}
          error={errors.password?.message}
        />
        <button
          type='submit'
          className='mt-2 w-1/12 rounded-md bg-blue-400 px-6 py-3 font-bold text-white'
        >
          로그인
        </button>
      </form>
      <h2 className='mt-12 mb-3 text-2xl font-bold'>예약 가능한 시간대</h2>
      <div className='mb-10 flex gap-4'>
        <div className='flex flex-col'>
          <label className='mb-2.5 text-xl text-gray-900'>날짜</label>
          <InputField placeholder='yy/mm/dd' type='text' className='h-11 sm:h-14' />
        </div>
        <div className='flex flex-col'>
          <label className='mb-2.5 text-xl text-gray-900'>시작 시간</label>
          <InputField placeholder='0:00' type='text' className='h-11 sm:h-14' />
        </div>
        <div className='flex flex-col'>
          <label className='mb-2.5 text-xl text-gray-900'>종료 시간</label>
          <InputField placeholder='0:00' type='text' className='h-11 sm:h-14' />
        </div>
      </div>
    </main>
  );
}
