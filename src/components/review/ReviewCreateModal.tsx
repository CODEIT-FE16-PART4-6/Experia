'use client';
import Image from 'next/image';
import { DialogTitle } from '@headlessui/react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReservationType } from '@/types/schema/reservationSchema';
import { StarRating } from '../StarRating';
import { ReviewPostReq, ReviewPostReqSchema } from '@/types/schema/reviewSchema';
import TextAreaField from '@/components/form/TextAreaField';
import Button from '../Button';
import { REQUEST_URL } from '@/utils/api-public';
import { useRouter } from 'next/navigation';
import useModalStore from '@/stores/modalStore';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjcwMjA3NSwiZXhwIjoxNzU3OTExNjc1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.gQpOm9em8mJEAgO3LYli_aOfi1LmUHtFDTQck_jCVdY';

const ReviewCreateModal = ({ data }: { data: ReservationType }) => {
  const { activity } = data;
  const router = useRouter();
  const closeAll = useModalStore(state => state.closeAll);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(ReviewPostReqSchema),
    defaultValues: {
      rating: 0,
      content: '',
    },
  });

  const onSubmit: SubmitHandler<ReviewPostReq> = async formData => {
    try {
      const res = await fetch(`${REQUEST_URL}/my-reservations/${data.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        const errorDefaultMsg = '리뷰 등록에 실패했습니다.';

        if (res.status === 409) {
          alert('이미 리뷰를 작성한 체험입니다.');
          return;
        }

        console.error('알 수 없는 에러 발생:', error);
        alert(error.message || errorDefaultMsg);
        return;
      }

      const result = await res.json();
      console.log(result);

      const alertMsg = '리뷰가 등록되었습니다.';
      alert(alertMsg);

      // 등록 후 모달 닫고 상세 페이지로 이동
      closeAll();
      router.push(`/activities/${result.activityId}`);
    } catch (err) {
      console.error('네트워크 에러:', err);
      alert('서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <div className='mb-4'>
        <DialogTitle className='text-2xl font-bold'>후기 작성</DialogTitle>
        <p className='text-md mt-1 text-gray-500'>리뷰 수정 기능이 추가될 예정입니다.😅</p>
      </div>

      <div className='flex gap-6'>
        <figure className='h-[100px] w-[100px] shrink-0 overflow-hidden rounded-xl md:h-[126px] md:w-[126px]'>
          <Image
            src={activity.bannerImageUrl}
            alt={activity.title}
            width={126}
            height={126}
            className='h-full w-full object-cover'
          />
        </figure>

        <div className='flex flex-col gap-3'>
          <h5 className='w-[90%] truncate text-xl font-bold'>{activity.title}</h5>
          <span className='text-lg'>
            {data.date} · {data.startTime} - {data.endTime} · {data.headCount}명
          </span>
          <h3 className='text-3xl font-bold'>₩{data.totalPrice}</h3>
        </div>
      </div>

      <div className='flex justify-center'>
        <Controller
          name='rating'
          control={control}
          render={({ field }) => <StarRating onChange={rate => field.onChange(rate ?? 1)} />}
        />
        {errors.rating && <p className='mt-1 text-sm text-red-600'>{errors.rating.message}</p>}
      </div>

      <TextAreaField
        placeholder='후기를 작성해주세요'
        {...register('content')}
        error={errors?.content?.message}
      />

      <Button size='md' variant='POSITIVE' type='submit' className='w-full'>
        작성하기
      </Button>
    </form>
  );
};

export default ReviewCreateModal;
