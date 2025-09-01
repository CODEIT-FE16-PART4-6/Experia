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
import ImageUploader from '@/components/ImageUpload/ImageUploader';
import MultiImageUploader from '@/components/ImageUpload/MultiImageUploader';
import { REQUEST_URL } from '@/utils/api-public';
import { useRouter } from 'next/navigation';

interface ActivityFormProps {
  initialData?: ActivityFormValues;
}

const STORAGE_KEY = 'add-activity-form';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjcwMjA3NSwiZXhwIjoxNzU3OTExNjc1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.gQpOm9em8mJEAgO3LYli_aOfi1LmUHtFDTQck_jCVdY'; // sd@email.com(pw:12345678) temp access token

const ActivityForm = ({ initialData }: ActivityFormProps) => {
  const router = useRouter();

  const methods = useForm<ActivityFormValues>({
    resolver: zodResolver(ActivityFormValueSchema),
    defaultValues: initialData ?? {
      title: '',
      category: '',
      description: '',
      address: '',
      price: 0,
      bannerImageUrl: '',
      subImages: [],
      schedules: [],
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const isEdit = Boolean(initialData);

  const defaultSubImages: string[] = initialData?.subImages?.map(img => img.imageUrl) ?? [];

  const onSubmit: SubmitHandler<ActivityFormValues> = async data => {
    try {
      const res = await fetch(`${REQUEST_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('서버 에러:', error);
        alert(error.message || '체험 등록에 실패했습니다.');
        return;
      }

      const result = await res.json();
      console.log('등록 성공:', result);
      alert('체험이 등록되었습니다!');

      // 등록 성공 후 상세 페이지로 이동
      router.push(`/activities/${result.id}`);
    } catch (err) {
      console.error('네트워크 에러:', err);
      alert('서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 pb-[180px]'>
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

        <Controller
          name='category'
          control={methods.control}
          render={({ field }) => (
            <DropdownSelect
              items={ACTIVITY_CATEGORIES}
              selectedItem={
                ACTIVITY_CATEGORIES.find(category => category.value === field.value) ?? null
              }
              onChange={item => field.onChange(item?.value ?? '')}
              placeholder='카테고리 선택'
            />
          )}
        />
        {errors && <p className='text-red-500'>{errors?.category?.message}</p>}

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
          <Controller
            name='schedules'
            control={methods.control}
            render={({ field }) => <DateTimeInputGroup {...field} />}
          />
          {errors && <p className='text-red-500'>{errors?.schedules?.message}</p>}
        </div>

        <div className='flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='bannerImg'>배너 이미지</FormLabel>
          <Controller
            name='bannerImageUrl'
            control={methods.control}
            render={({ field, fieldState }) => (
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          {errors && <p className='text-red-500'>{errors?.bannerImageUrl?.message}</p>}
        </div>

        <div className='flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='subImg'>상세 이미지</FormLabel>
          <Controller
            name='subImages'
            control={methods.control}
            render={({ field, fieldState }) => (
              <MultiImageUploader
                images={field.value ?? []} // field.value undefined면 빈 배열로 초기화
                onChange={field.onChange}
                error={fieldState.error?.message}
                maxCount={4}
              />
            )}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ActivityForm;
