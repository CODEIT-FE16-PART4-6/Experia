'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Link from 'next/link';
import { LoginRequestSchema } from '@/types/schema/userSchema';
// 리액트 훅 폼과 zod를 연결해주는 라이브러리
import { zodResolver } from '@hookform/resolvers/zod'

// 사용자 정보 타입
interface UserDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 로그인 응답 데이터 타입
interface LoginResponse {
  user: UserDto;
  refreshToken: string;
  accessToken: string;
}

// 로그인 요청 데이터 타입
interface LoginRequest {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register, // input폼 연결
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    mode: 'onChange', // 입력값이 바뀔 때마다 검사
  }) // 여기에 연결 해줌!

  // 로그인 요청
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    console.log('전송 데이터:', data)
    setLoading(true);
    setError(null);

    // 로그인 데이터 전송
    try {
      const response = await fetch('https://sp-globalnomad-api.vercel.app/16-6/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const responseText = await response.text();
      console.log('응답 텍스트:', responseText);

      const responseData = JSON.parse(responseText);
      console.log('응답 데이터:', responseData);

      if (!response.ok || !responseData.accessToken || !responseData.refreshToken) {
        // 필요한 데이터가 없는 경우
        console.error('로그인 실패:', response.status, responseData);
        throw new Error('로그인 실패: 필수 데이터가 누락되었습니다.');
      }

      localStorage.setItem('access_token', responseData.accessToken);
      localStorage.setItem('refresh_token', responseData.refreshToken);
      localStorage.setItem('user', JSON.stringify(responseData.user));

      console.log('저장 후 확인:', {
        accessTokenStored: localStorage.getItem('access_token'),
        refreshTokenStored: localStorage.getItem('refresh_token'),
      });

      router.push('/');
    } catch (err) {
      console.error('로그인 중 오류 발생', err);
      setError('이메일 혹은 비밀번호가 일치하지 않습니다.');
      setLoading(false);
    }
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;
    try {
      const response = await fetch('/* 토큰 갱신 API 엔드포인트 */', {
        // 실제 엔드포인트로 대체
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        throw new Error('요청 실패');
      }
      const data: { accessToken: string } = await response.json();
      localStorage.setItem('access_token', data.accessToken);
      return true;
    } catch (error) {
      console.error('토큰 갱신 실패:', error); // 오류 로깅 추가
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      return false;
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
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
              {...register('email', { required: '이메일 형식에 맞게 입력해주세요' })}
              error={errors.email?.message}
            />
            <div className="relative">
              <InputField
                label="비밀번호"
                placeholder="비밀번호 입력해 주세요"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password', { required: '8자 이상 작성해주세요' })}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-15 -translate-y-1/2"
              >
                <Image
                  src={showPassword ? '/icons/ic_EyeOff.svg' : '/icons/ic_Eye.svg'}
                  alt="비밀번호 표시 토글"
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
                {loading ? '로딩 중...' : '로그인 하기'}
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-gray-900 text-base mb-4">
              회원이 아니신가요?
              <Link href="/signup" className="text-nomad-black underline ml-1">
                회원가입하기
              </Link>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="mx-9 text-gray-800 text-xl">SNS 계정으로 로그인하기</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center mt-4">
              <Link href='https://www.kakaocorp.com/'>
                <Image src='/icons/ic_SocialLogo.svg' alt='kakao 로고' width={48} height={48} className="sm:w-18 sm:h-18" />
              </Link>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
};

export default LoginPage;
