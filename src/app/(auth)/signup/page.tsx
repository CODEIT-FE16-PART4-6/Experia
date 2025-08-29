'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import InputField from '@/components/InputField'
import Link from 'next/link'
import Button from '@/components/Button'
import { SignupRequest, SignupRequestSchema } from "@/types/schema/userSchema"
import { useState } from "react"
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupRequest>({
    resolver: zodResolver(SignupRequestSchema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<SignupRequest> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://sp-globalnomad-api.vercel.app/16-6/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('응답 데이터:', result);

      // HTTP 상태 코드 체크
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('중복된 이메일입니다.');
        }
        throw new Error(result.message || '회원가입 실패');
      }

      // 응답은 성공적이지만 필수 데이터가 없는 경우를 체크하여 에러를 발생시킵니다.
      if (!result.accessToken || !result.refreshToken) {
        throw new Error('회원가입 실패: 서버로부터 필수 데이터(토큰)를 받지 못했습니다.');
      }

      localStorage.setItem('access_token', result.accessToken);
      localStorage.setItem('refresh_token', result.refreshToken);
      localStorage.setItem('user', JSON.stringify(result.user));

      console.log('저장 후 확인:', {
        accessTokenStored: localStorage.getItem('access_token'),
        refreshTokenStored: localStorage.getItem('refresh_token'),
      });

      router.push('/signin');

    } catch (err: unknown) {
      console.error('회원가입 중 오류 발생', err);

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
        <div className='flex justify-center mb-14'>
          <Link href='/'>
            <Image src='/images/logo.svg' alt='Experia 로고' width={260} height={42} />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-7'>
            <InputField
              label="이메일"
              placeholder="이메일 입력해 주세요"
              type="email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <InputField
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              type="text"
              autoComplete="username"
              {...register('nickname')}
              error={errors.nickname?.message}
            />

            <div className="relative">
              <InputField
                label="비밀번호"
                placeholder="비밀번호 입력해 주세요"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                {...register('password')}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[50px]"
              >
                <Image
                  src={showPassword ? '/icons/ic_EyeOff.svg' : '/icons/ic_Eye.svg'}
                  alt="비밀번호 표시 토글"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="relative">
              <InputField
                label="비밀번호 확인"
                placeholder="비밀번호 한번 더 입력해 주세요"
                type={showPasswordConfirm ? "text" : "password"}
                autoComplete="new-password"
                {...register('passwordConfirm')}
                error={errors.passwordConfirm?.message}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 top-[50px]"
              >
                <Image
                  src={showPasswordConfirm ? '/icons/ic_EyeOff.svg' : '/icons/ic_Eye.svg'}
                  alt="비밀번호 확인 표시 토글"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className='flex flex-col'>
              {error && <p className='text-red-600 text-sm mb-2'>{error}</p>}
              <Button
                type='submit'
                variant='POSITIVE'
                size='lg'
                disabled={!isValid || loading}
              >
                {loading ? '회원가입 중...' : '회원가입 하기'}
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-gray-900 text-base mb-4">
              이미 회원이신가요?
              <Link href="/signin" className="text-nomad-black underline ml-1">
                로그인하기
              </Link>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="mx-9 text-gray-800 text-xl">SNS 계정으로 회원가입하기</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center mt-4">
              <Link href='https://www.kakaocorp.com/'>
                <Image
                  src='/icons/ic_SocialLogo.svg'
                  alt='kakao 로고'
                  width={48}
                  height={48}
                  className="sm:w-18 sm:h-18"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default SignupPage;
