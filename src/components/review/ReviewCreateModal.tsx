'use client';
import { DialogTitle } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import TextAreaField from '@/components/form/TextAreaField';
import useModalStore from '@/stores/modalStore';
import { ReservationType } from '@/types/schema/reservationSchema';
import { ReviewPostReq, ReviewPostReqSchema } from '@/types/schema/reviewSchema';
import { REQUEST_URL } from '@/utils/api-public';

import Button from '../Button';
import { StarRating } from '../StarRating';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU3MiwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NzYwMTA0MSwiZXhwIjoxNzU3NjAyODQxLCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.XVHolsyctiZ-Pv5cKl06cLZdWD_ycpCi9S3Gh3Kkgo0';
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

        console.error('서버 에러:', error);
        alert(error.message || errorDefaultMsg);
        return;
      }

      const result = await res.json();

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-6 overflow-auto overflow-x-hidden'
    >
      <div className='form-header'>
        <DialogTitle className='text-2xl font-bold'>후기 작성</DialogTitle>
        <p className='text-md mt-1 text-gray-500'>등록하신 리뷰는 수정할 수 없습니다.</p>
      </div>

      <div className='form-content'>
        <div className='flex items-center gap-4 md:gap-6'>
          <figure className='h-[100px] w-[100px] shrink-0 overflow-hidden rounded-xl md:h-[126px] md:w-[126px]'>
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              width={126}
              height={126}
              className='h-full w-full object-cover'
            />
          </figure>

          <div className='flex w-full flex-col gap-1 md:gap-3'>
            <h5 className='w-[90%] truncate text-base font-bold md:text-xl'>{activity.title}</h5>
            <div className='text-md flex flex-wrap md:text-lg'>
              {data.date} · {data.startTime} - {data.endTime} · {data.headCount}명
            </div>
            <h3 className='text-xl font-bold md:text-3xl'>₩{data.totalPrice}</h3>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <Controller
            name='rating'
            control={control}
            render={({ field }) => <StarRating onChange={rate => field.onChange(rate ?? 1)} />}
          />
          {errors.rating && <p className='mt-2 text-sm text-red-600'>{errors.rating.message}</p>}
        </div>

        <TextAreaField
          placeholder='후기를 작성해주세요'
          {...register('content')}
          error={errors?.content?.message}
          className='h-full'
        />
      </div>

      <div className='form-footer'>
        <Button size='md' variant='POSITIVE' type='submit' className='w-full'>
          작성하기
        </Button>
      </div>
    </form>
  );
};

export default ReviewCreateModal;
