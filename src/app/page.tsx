import InputField from '@/components/InputField';
import { Field } from '@headlessui/react';

export default function Home() {
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
      <Field>
        <InputField label='이름' placeholder='이름을 입력해주세요' inputLabelGap={10} />
      </Field>
    </main>
  );
}
