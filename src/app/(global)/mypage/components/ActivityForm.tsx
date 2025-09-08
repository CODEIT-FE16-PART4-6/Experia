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
import fetchClientData from '@/utils/api-client/fetchClientData';

interface ActivityFormProps {
  initialData?: ActivityFormValues;
}

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

  const onSubmit: SubmitHandler<ActivityFormValues> = async formData => {
    const schedules = methods.getValues('schedules');
    if (!schedules || schedules.length === 0) {
      methods.setError('schedules', {
        type: 'manual',
        message: '시간대를 하나 이상 추가해주세요.',
      });
      return;
    }

    try {
      const url = isEdit ? `/my-activities/${initialData?.id}` : `/activities`;

      const method = isEdit ? 'PATCH' : 'POST';

      const payload = isEdit
        ? preparePatchPayload(formData, initialData)
        : {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            address: formData.address,
            price: formData.price,
            schedules: formData.schedules,
            bannerImageUrl: formData.bannerImageUrl,
            subImageUrls: (formData.subImages ?? []).map(img => img.imageUrl),
          };

      const data = await fetchClientData(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const alertMsg = `체험이 ${isEdit ? '수정' : '등록'}되었습니다.`;
      alert(alertMsg);

      // 등록/수정 후 상세 페이지로 이동
      router.push(`/activities/${data.id}`);
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

        <div className='mb-4'>
          <FormLabel inputId='title' className='mb-4'>
            체험명
          </FormLabel>
          <InputField
            placeholder='체험명'
            className='w-full'
            {...register('title')}
            error={errors?.title?.message}
          />
        </div>

        <div className='mb-4'>
          <FormLabel inputId='category' className='mb-4'>
            카테고리
          </FormLabel>
          <Controller
            name='category'
            control={methods.control}
            render={({ field, fieldState }) => (
              <DropdownSelect
                items={ACTIVITY_CATEGORIES}
                selectedItem={
                  ACTIVITY_CATEGORIES.find(category => category.value === field.value) ?? null
                }
                placeholder='카테고리 선택'
                error={fieldState.error?.message}
                onChange={item => field.onChange(item?.value ?? '')}
              />
            )}
          />
        </div>

        <div className='mb-4'>
          <FormLabel inputId='description' className='mb-4'>
            체험 설명
          </FormLabel>
          <TextAreaField
            placeholder='체험 설명'
            {...register('description')}
            error={errors?.description?.message}
          />
        </div>

        <div className='mb-4 flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='price'>가격</FormLabel>
          <InputField
            id='price'
            type='number'
            placeholder='가격'
            className='w-full'
            {...register('price', {
              valueAsNumber: true,
            })}
            error={errors?.price?.message}
          />
        </div>

        <div className='mb-4 flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='address'>주소</FormLabel>
          <Controller
            name='address'
            control={methods.control}
            render={({ field, fieldState }) => (
              <AddressField {...field} error={fieldState.error?.message} />
            )}
          />
        </div>

        <div className='mb-4 flex flex-col gap-3 md:gap-4'>
          <FormLabel inputId='date'>예약 가능한 시간대</FormLabel>
          <Controller
            name='schedules'
            control={methods.control}
            render={({ field }) => <DateTimeInputGroup {...field} />}
          />
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
