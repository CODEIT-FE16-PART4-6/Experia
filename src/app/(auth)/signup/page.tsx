'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { ROUTES } from '@/constants';
import { useUserStore } from '@/stores/userStore';
import {
  LoginResponseSchema,
  SignupRequest,
  SignupRequestSchema,
  SignupResponseSchema,
} from '@/types/schema/userSchema';
import { validateApiResponse } from '@/utils/api-validation';

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const setUser = useUserStore(state => state.setUser); // 전역 상태 관리 훅

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupRequest>({
    resolver: zodResolver(SignupRequestSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignupRequest> = async data => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://sp-globalnomad-api.vercel.app/16-6/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const signupResult = await response.json();

      // HTTP 상태 코드 체크
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('중복된 이메일입니다.');
        }
        throw new Error(signupResult.message || '회원가입 실패');
      }

      // 🔥 회원가입 응답 검증 (선택적 - 서버가 토큰을 반환하지 않는 경우)
      try {
        validateApiResponse(signupResult, SignupResponseSchema);
      } catch (validationError) {
        console.warn('회원가입 응답 검증 실패 (계속 진행):', validationError);
      }

      // 로그인 API 호출
      const loginResponse = await fetch('https://sp-globalnomad-api.vercel.app/16-6/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const loginRawData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error('자동 로그인 실패: 서버 응답 오류입니다.');
      }

      // 🔥 로그인 응답 검증
      const loginResult = validateApiResponse(loginRawData, LoginResponseSchema);

      if (!loginResult.accessToken || !loginResult.refreshToken) {
        throw new Error('자동 로그인 실패: 토큰을 받지 못했습니다.');
      }

      // 토큰 저장
      localStorage.setItem('access_token', loginResult.accessToken);
      localStorage.setItem('refresh_token', loginResult.refreshToken);

      // 전역 상태에 유저 정보 저장 (로그인과 동일한 로직)
      if (loginResult.user) {
        setUser(loginResult.user);
      }

      router.push(ROUTES.HOME);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-2xl px-4'>
        <div className='mb-14 flex justify-center'>
          <Link href='/'>
            <Image src='/images/logo.svg' alt='Experia 로고' width={260} height={42} />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-7'>
            <InputField
              label='이메일'
              placeholder='이메일 입력해 주세요'
              type='email'
              autoComplete='email'
              {...register('email')}
              error={errors.email?.message}
            />

            <InputField
              label='닉네임'
              placeholder='닉네임을 입력해 주세요'
              type='text'
              autoComplete='username'
              {...register('nickname')}
              error={errors.nickname?.message}
            />

            <div className='relative'>
              <InputField
                label='비밀번호'
                placeholder='비밀번호 입력해 주세요'
                type={showPassword ? 'text' : 'password'}
                autoComplete='new-password'
                {...register('password')}
                error={errors.password?.message}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-[50px] right-4'
              >
                <Image
                  src={showPassword ? '/icons/ic_EyeOff.svg' : '/icons/ic_Eye.svg'}
                  alt='비밀번호 표시 토글'
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className='relative'>
              <InputField
                label='비밀번호 확인'
                placeholder='비밀번호 한번 더 입력해 주세요'
                type={showPasswordConfirm ? 'text' : 'password'}
                autoComplete='new-password'
                {...register('passwordConfirm')}
                error={errors.passwordConfirm?.message}
              />
              <button
                type='button'
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className='absolute top-[50px] right-4'
              >
                <Image
                  src={showPasswordConfirm ? '/icons/ic_EyeOff.svg' : '/icons/ic_Eye.svg'}
                  alt='비밀번호 확인 표시 토글'
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className='flex flex-col'>
              {error && <p className='mb-2 text-sm text-red-600'>{error}</p>}
              <Button type='submit' variant='POSITIVE' size='lg' disabled={!isValid || loading}>
                {loading ? '회원가입 중...' : '회원가입 하기'}
              </Button>
            </div>
          </div>

          <div className='mt-6 text-center'>
            <div className='mb-4 text-base text-gray-900'>
              이미 회원이신가요?
              <Link href='/signin' className='text-nomad-black ml-1 underline'>
                로그인하기
              </Link>
            </div>

            <div className='my-6 flex items-center'>
              <div className='h-px flex-1 bg-gray-300'></div>
              <p className='mx-9 text-xl text-gray-800'>SNS 계정으로 회원가입하기</p>
              <div className='h-px flex-1 bg-gray-300'></div>
            </div>

            <div className='mt-4 flex justify-center'>
              <Link href='https://www.kakaocorp.com/'>
                <Image
                  src='/icons/ic_SocialLogo.svg'
                  alt='kakao 로고'
                  width={48}
                  height={48}
                  className='sm:h-18 sm:w-18'
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
