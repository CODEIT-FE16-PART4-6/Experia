'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef } from 'react';
import { useForm, FormProvider, SubmitHandler, Controller } from 'react-hook-form';

import InputField from '@/components/InputField';
import { useUserStore } from '@/stores/userStore';
import { MyInfoFormValues, MyInfoFormSchema } from '@/types/schema/myInfoFormSchema';

interface MyInfoFormProps {
  onSubmit: SubmitHandler<MyInfoFormValues>;
}

const MyInfoForm = forwardRef<HTMLFormElement, MyInfoFormProps>(({ onSubmit }, ref) => {
  const INPUT_CLASS_NAME = 'mb-8 w-full';
  const user = useUserStore(state => state.user);

  const methods = useForm<MyInfoFormValues>({
    resolver: zodResolver(MyInfoFormSchema),
    defaultValues: {
      nickname: user?.nickname || '',
      email: user?.email || '',
      password: '',
      passwordConfirm: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name='nickname'
            control={methods.control}
            render={({ field }) => (
              <InputField
                label='닉네임'
                placeholder='닉네임'
                className={INPUT_CLASS_NAME}
                {...field}
              />
            )}
          />
          {errors.nickname && (
            <p className='mb-4 text-sm text-red-500'>{errors.nickname.message}</p>
          )}

          <Controller
            name='email'
            control={methods.control}
            render={({ field }) => (
              <InputField
                label='이메일'
                placeholder='이메일'
                className={INPUT_CLASS_NAME}
                {...field}
              />
            )}
          />
          {errors.email && <p className='mb-4 text-sm text-red-500'>{errors.email.message}</p>}

          <Controller
            name='password'
            control={methods.control}
            render={({ field }) => (
              <InputField
                label='비밀번호'
                placeholder='8자 이상 입력해 주세요'
                type='password'
                className={INPUT_CLASS_NAME}
                {...field}
              />
            )}
          />
          {errors.password && (
            <p className='mb-4 text-sm text-red-500'>{errors.password.message}</p>
          )}

          <Controller
            name='passwordConfirm'
            control={methods.control}
            render={({ field }) => (
              <InputField
                label='비밀번호 재입력'
                placeholder='비밀번호를 한번 더 입력해 주세요'
                type='password'
                className={INPUT_CLASS_NAME}
                {...field}
              />
            )}
          />
          {errors.passwordConfirm && (
            <p className='mb-4 text-sm text-red-500'>{errors.passwordConfirm.message}</p>
          )}
        </div>
      </form>
    </FormProvider>
  );
});

MyInfoForm.displayName = 'MyInfoForm';

export default MyInfoForm;
