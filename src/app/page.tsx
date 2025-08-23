'use client';

import InputField from '@/components/InputField';
import { useForm } from 'react-hook-form';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string; nickname: string}>();

  const onSubmit = (data: any) => console.log(data);
  return (
    <main>
      반응형, 컬러 시스템 테스트
      <div className='bg-primary md:bg-green lg:bg-yellow h-6 w-full md:mx-5 md:w-[400px] lg:w-[1200px]'></div>
      <h2 className='text-4xl font-bold text-black'>폰트 테스트</h2>
      <h3 className='text-primary-dark text-3xl font-bold'>폰트 테스트</h3>
      <h4 className='text-red-primary text-2xl font-semibold'>폰트 테스트</h4>
      <h5 className='text-orange text-xl font-medium'>폰트 테스트</h5>
      <h6 className='text-green text-lg'>폰트 테스트</h6>
      <p className='text-base text-black'>폰트 테스트</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label='이메일'
          placeholder='이메일 입력'
          type='email'
          {...register('email', { required: '이메일을 입력해주세요' })}
          error={errors.email?.message}
          labelClassName='text-green'
        />
         <InputField
          label='닉네임'
          placeholder='닉네임을 입력해 주세요'
          type='text'
          {...register('nickname', { required: '닉네임을 입력해주세요' })}
          error={errors.nickname?.message}
        />
        <InputField
          label='비밀번호'
          placeholder='비밀번호 입력'
          type='password'
          {...register('password', { required: '비밀번호를 입력해주세요' })}
          error={errors.password?.message}
        />
          <label className='text-2xl font-bold pb-2'>가격</label>
           <InputField
          placeholder='정만철'
          type='text'
          {...register('nickname', { required: '비밀번호를 입력해주세요' })}
          error={errors.nickname?.message}
        />
           <label className='text-2xl font-bold pb-3'>주소</label>
           <InputField
          placeholder='정만철'
          type='text'
          {...register('nickname', { required: '비밀번호를 입력해주세요' })}
          error={errors.nickname?.message}
        />
        <button type='submit' className='w-1/12 bg-blue-400 py-3 px-6 rounded-md text-white font-bold'>로그인</button>
      </form>
    </main>
  );
}
