'use client';

import { ACTIVITY_CATEGORIES } from '@/constants';
import InputField from '@/components/InputField';
import DropdownSelect from '@/components/DropdownSelect';
import TextAreaField from '@/components/form/TextAreaField';
import FormLabel from '@/components/form/FormLabel';
import AddressField from '@/components/form/AddressField';
import DateTimeInputGroup from '@/components/ui/DateTimeInputGroup';
import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import Button from '@/components/Button';
import { ActivityFormValueSchema, ActivityFormValues } from '@/types/schema/activitiesSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const AddActivityForm = () => {
  const methods = useForm<ActivityFormValues>({
    resolver: zodResolver(ActivityFormValueSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<ActivityFormValues> = data => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, errors => console.log('Errors:', errors))}
        className='flex flex-col gap-4 p-4'
      >
        <SectionTitle
          title='내 체험 등록'
          action={
            <Button variant='POSITIVE' size='md' type='submit'>
              등록하기
            </Button>
          }
        />

        <InputField placeholder='제목' className='w-full' {...register('title')} />
        {errors && <p className='text-red-500'>{errors?.title?.message}</p>}

        {/* <DropdownSelect name='category' items={ACTIVITY_CATEGORIES} /> */}

        <TextAreaField placeholder='체험 설명' {...register('description')} />
        {errors && <p className='text-red-500'>{errors?.description?.message}</p>}

        <div className='flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='price'>가격</FormLabel>
          <InputField
            id='price'
            type='number'
            placeholder='가격'
            className='w-full'
            {...register('price', {
              valueAsNumber: true,
            })}
          />
          {errors && <p className='text-red-500'>{errors?.price?.message}</p>}
        </div>

        <div className='flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='address'>주소</FormLabel>
          <Controller
            name='address'
            control={methods.control}
            render={({ field }) => <AddressField {...field} />}
          />
          {errors && <p className='text-red-500'>{errors?.address?.message}</p>}
        </div>

        <div className='flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='date'>예약 가능한 시간대</FormLabel>
          {/* <DateTimeInputGroup name='schedules' /> */}
        </div>
      </form>
    </FormProvider>
  );
};

export default AddActivityForm;
