'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 요청 데이터 타입
interface LoginRequest {
  email: string;
  password: string;
}

// 사용자 정보 타입
interface UserDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 응답 데이터 타입
interface LoginResponse {
  user: UserDto;
  refreshToken: string;
  accessToken: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    console.log('로그인 버튼 클릭됨');
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://sp-globalnomad-api.vercel.app/16-6/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password } as LoginRequest),
      });

      const responseText = await response.text();
      console.log('응답 텍스트:', responseText);

      const data = JSON.parse(responseText);
      console.log('응답 데이터:', data);

      if (!response.ok) {
        // 서버 응답이 에러인 경우
        console.error('서버 응답 에러:', response.status, data);
        throw new Error(`로그인 실패: ${response.status} ${data.message || 'Unknown error'}`);
      }

      if (!data.accessToken || !data.refreshToken) {
        // 필요한 데이터가 없는 경우
        console.error('필수 데이터 누락:', data);
        throw new Error('로그인 실패: 필수 데이터가 누락되었습니다.');
      }

      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log('저장 후 확인:', {
        accessTokenStored: localStorage.getItem('access_token'),
        refreshTokenStored: localStorage.getItem('refresh_token'),
      });

      router.push('/activities');
    } catch (err) {
      console.error('로그인 중 오류 발생:', err);
      setError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.');
    } finally {
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
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded bg-white p-8 shadow'>
        <h2 className='mb-4 text-center text-2xl font-bold'>임시 로그인</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {error && <div className='mb-4 text-sm text-red-500'>{error}</div>}
          <div className='mb-4'>
            <label className='mb-1 block' htmlFor='email'>
              이메일
            </label>
            <input
              id='email'
              type='email'
              className='w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none'
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className='mb-4'>
            <label className='mb-1 block' htmlFor='password'>
              비밀번호
            </label>
            <input
              id='password'
              type='text'
              autoComplete='current-password'
              className='w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none'
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type='submit'
            onClick={handleLogin}
            className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? '로딩 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
