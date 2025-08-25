'use client';

import { StarRating } from '@/components/StarRating';
import ButtonField from '@/components/Button';
import { useState } from 'react';

export default function Home() {
  const [rating, setRating] = useState(0);

  return (
    <main>
      <section>
        <h2 className="text-xl font-bold mb-2">버튼 테스트</h2>
        <div className="w-1/5 flex flex-col gap-2 mb-5">
          <ButtonField variant='primary' size='lg'>로그인 하기</ButtonField>
          <ButtonField variant='secondary' size='lg'>로그인 하기</ButtonField>
          <ButtonField variant="danger" size="lg" disabled>신청 불가</ButtonField>
        </div>
        <div className="w-1/8 flex flex-col gap-2 mb-5">
          <ButtonField variant='primary' size='md'>로그인 하기</ButtonField>
          <ButtonField variant='secondary' size='md'>로그인 하기</ButtonField>
          <ButtonField variant="danger" size="md" disabled>신청 불가</ButtonField>
        </div>
        <div className="w-1/14 flex flex-col gap-2 mb-5">
          <ButtonField variant='primary' size='sm'>로그인 하기</ButtonField>
          <ButtonField variant='secondary' size='sm'>로그인 하기</ButtonField>
          <ButtonField variant="danger" size="sm" disabled>신청 불가</ButtonField>
        </div>
      </section>

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
      <div className='h-[150vh]'></div>
    </main>
  );
}
