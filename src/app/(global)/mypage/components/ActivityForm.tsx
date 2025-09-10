'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@/components/Button';
import DropdownSelect from '@/components/DropdownSelect';
import ImageUploader from '@/components/ImageUpload/ImageUploader';
import MultiImageUploader from '@/components/ImageUpload/MultiImageUploader';
import InputField from '@/components/InputField';
import AddressField from '@/components/form/AddressField';
import FormLabel from '@/components/form/FormLabel';
import TextAreaField from '@/components/form/TextAreaField';
import DateTimeInputGroup from '@/components/ui/DateTimeInputGroup';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { ACTIVITY_CATEGORIES } from '@/constants';
import { ActivityFormValueSchema, ActivityFormValues } from '@/types/schema/activitiesSchema';
import { REQUEST_URL } from '@/utils/api-public';

interface ActivityFormProps {
  initialData?: ActivityFormValues;
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjcwMjA3NSwiZXhwIjoxNzU3OTExNjc1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.gQpOm9em8mJEAgO3LYli_aOfi1LmUHtFDTQck_jCVdY';

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

  const preparePatchPayload = (
    formValues: ActivityFormValues,
    initialData: ActivityFormValues | undefined,
  ) => {
    if (!initialData) return formValues; // 폼 등록

    // 수정 시 patch 요청 구조
    // 삭제된 상세 이미지
    const subImageIdsToRemove = initialData.subImages
      .filter(initImg => !formValues.subImages.some(fvImg => fvImg.imageUrl === initImg.imageUrl))
      .map(img => img.id!); // 초기 데이터에 있는 이미지 중 제거된 것

    // 추가된 상세 이미지
    const subImageUrlsToAdd = formValues.subImages
      .filter(fvImg => !initialData.subImages.some(initImg => initImg.imageUrl === fvImg.imageUrl))
      .map(img => img.imageUrl);

    // 삭제된 예약 시간대
    const scheduleIdsToRemove = initialData.schedules
      .filter(
        initSched =>
          !formValues.schedules.some(
            fvSched =>
              fvSched.date === initSched.date &&
              fvSched.startTime === initSched.startTime &&
              fvSched.endTime === initSched.endTime,
          ),
      )
      .map(s => s.id!);

    // 추가된 예약 시간대
    const schedulesToAdd = formValues.schedules.filter(
      fvSched =>
        !initialData.schedules.some(
          initSched =>
            initSched.date === fvSched.date &&
            initSched.startTime === fvSched.startTime &&
            initSched.endTime === fvSched.endTime,
        ),
    );

    return {
      title: formValues.title,
      category: formValues.category,
      description: formValues.description,
      price: formValues.price,
      address: formValues.address,
      bannerImageUrl: formValues.bannerImageUrl,
      subImageIdsToRemove,
      subImageUrlsToAdd,
      scheduleIdsToRemove,
      schedulesToAdd,
    };
  };

  const onSubmit: SubmitHandler<ActivityFormValues> = async data => {
    try {
      const url = isEdit
        ? `${REQUEST_URL}/my-activities/${initialData?.id}`
        : `${REQUEST_URL}/activities`;

      const method = isEdit ? 'PATCH' : 'POST';

      const payload = isEdit
        ? preparePatchPayload(data, initialData)
        : {
            title: data.title,
            category: data.category,
            description: data.description,
            address: data.address,
            price: data.price,
            schedules: data.schedules,
            bannerImageUrl: data.bannerImageUrl,
            subImageUrls: (data.subImages ?? []).map(img => img.imageUrl),
          };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        const errorDefaultMsg = `체험 ${isEdit ? '수정' : '등록'}에 실패했습니다.`;

        console.error('서버 에러:', error);
        alert(error.message || errorDefaultMsg);
        return;
      }

      const result = await res.json();
      const alertMsg = `체험이 ${isEdit ? '수정' : '등록'}되었습니다.`;
      alert(alertMsg);

      // 등록/수정 후 상세 페이지로 이동
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
          title={isEdit ? '내 체험 수정' : '내 체험 등록'}
          action={
            <Button variant='POSITIVE' size='md' type='submit'>
              {isEdit ? '수정하기' : '등록하기'}
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
                images={field.value}
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
