'use client';
import Button from '@/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StarRating } from '@/components/StarRating';
import { useState } from 'react';

  export default function Home() {
  const [rating, setRating] = useState(0);
  // 상태에 따른 버튼 활성화/비활성화
  const isDisabled = true;
    
  return (
    <main>
      <div className="w-80">
        <h2 className="text-xl font-bold mb-2">체험 상세 테스트</h2>
        <Button variant="POSITIVE" size="lg" disabled={isDisabled}>
          예약하기
        </Button>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-2">버튼 테스트</h2>
        <div className="w-1/5 flex flex-col gap-2 mb-5">
          <Button variant='DEFAULT' size='lg'>로그인 하기</Button>
          <Button variant='POSITIVE' size='lg' >로그인 하기</Button>
          <Button variant="NEGATIVE" size="lg" disabled>신청 불가</Button>
        </div>
        <div className="w-1/6 flex flex-col gap-2 mb-5">
          <Button variant='DEFAULT' size='md'>로그인 하기</Button>
          <Button variant='POSITIVE' size='md'>로그인 하기</Button>
          <Button variant="NEGATIVE" size="md" disabled>신청 불가</Button>
        </div>
        <div className="w-1/16 flex flex-col gap-2 mb-5">
          <Button variant='DEFAULT' size='sm'>로그인 하기</Button>
          <Button variant='POSITIVE' size='sm'>로그인 하기</Button>
          <Button variant="NEGATIVE" size="sm" disabled>신청 불가</Button>
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
    </main>
  );
}
