'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useUserStore } from '@/stores/userStore';
import { LoginRequestSchema, LoginRequest } from '@/types/schema/userSchema';
import { REQUEST_URL } from '@/utils/api-public';

// 리액트 훅 폼과 zod를 연결해주는 라이브러리

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore(state => state.setUser); // 전역 상태 관리 훅
  const user = useUserStore(state => state.user); // 전역 상태 관리 훅

  const {
    register, // input폼 연결
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    mode: 'onChange', // 입력값이 바뀔 때마다 검사
  }); // 여기에 연결 해줌!

  // 로그인 요청
  const onSubmit: SubmitHandler<LoginRequest> = async data => {
    setLoading(true);
    setError(null);

    // 로그인 데이터 전송
    try {
      const response = await fetch(`${REQUEST_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const { user, accessToken, refreshToken } = await response.json();

      // HTTP 상태 코드 체크
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
        } else {
          throw new Error('로그인 실패: 서버 응답 오류입니다.');
        }
      }

      // 성공적으로 로그인 처리
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      // 전역 상태에 유저 정보 저장
      if (response.ok && user) {
        setUser(user);

        // [P6-152] 페이지별 리디렉션: 쿠키에 토큰을 저장하기 위해 next 서버로 전송 (쿠키: middleware.ts에서 사용)
        await fetch('/api/auth/set-cookies', {
          method: 'POST',
          body: JSON.stringify({ accessToken, refreshToken }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // 쿼리 파라미터에서 callbackUrl 가져오기 (리다이렉션)
        const callbackUrl = searchParams.get('callbackUrl');

        // 로그인 성공: callbackUrl 또는 메인 페이지로 리다이렉션 (요청 성공 시에만 실행되도록 if문 안으로 이동)
        router.push(callbackUrl || '/');
      }
    } catch (err: unknown) {
      console.error('로그인 중 오류 발생', err);

      if (err instanceof Error) {
        setError(err.message); // 실제 Error 메시지 표시
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 이미 로그인 되어있는 경우, 메인 페이지로 리다이렉션
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
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
              {...register('email')} // zod 스키마와 연결되어 유효성 검사 자동 실행
              error={errors.email?.message}
            />
            <div className='relative'>
              <InputField
                label='비밀번호'
                placeholder='비밀번호 입력해 주세요'
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                {...register('password')}
                error={errors.password?.message}
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-15 right-4 -translate-y-1/2'
              >
                <Image
                  src={showPassword ? '/icons/ic_EyeOff.svg' : '/icons/ic_Eye.svg'}
                  alt='비밀번호 표시 토글'
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className='flex flex-col'>
              {error && <p className='mb-2 text-sm text-red-600'>{error}</p>}
              <Button type='submit' variant='POSITIVE' size='lg' disabled={!isValid || loading}>
                {loading ? '로그인 중...' : '로그인 하기'}
              </Button>
            </div>
          </div>

          <div className='mt-6 text-center'>
            <div className='mb-4 text-base text-gray-900'>
              회원이 아니신가요?
              <Link href='/signup' className='text-nomad-black ml-1 underline'>
                회원가입하기
              </Link>
            </div>

            <div className='my-6 flex items-center'>
              <div className='h-px flex-1 bg-gray-300'></div>
              <p className='mx-9 text-xl text-gray-800'>SNS 계정으로 로그인하기</p>
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
    </div>
  );
};

export default LoginPage;
