'use client';

import { ACTIVITY_CATEGORIES } from '@/constants';
import InputField from '@/components/InputField';
import DropdownSelect from '@/components/DropdownSelect';
import TextAreaField from '@/components/form/TextAreaField';
import FormLabel from '@/components/form/FormLabel';
import AddressField from '@/components/form/AddressField';

const AddActivityForm = () => {
  return (
    <form className='flex w-full flex-col gap-6 pb-[180px]'>
      <InputField placeholder='제목' className='w-full' />

      <DropdownSelect items={ACTIVITY_CATEGORIES} />

      <TextAreaField placeholder='체험 설명' />

      <div className='flex flex-col gap-3 md:gap-4'>
        <FormLabel inputId='price'>가격</FormLabel>
        <InputField id='price' placeholder='가격' className='w-full' />
      </div>

      <div className='flex flex-col gap-3 md:gap-4'>
        <FormLabel inputId='address'>주소</FormLabel>
        <AddressField />
      </div>

      <div className='flex flex-col gap-3 md:gap-4'>
        <FormLabel>예약 가능한 시간대</FormLabel>
      </div>
    </form>
  );
};

export default AddActivityForm;
