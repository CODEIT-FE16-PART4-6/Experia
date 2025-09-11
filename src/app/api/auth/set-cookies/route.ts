import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, refreshToken } = await request.json();
  const cookieStore = await cookies(); // next.js 15에서는 cookies() 비동기 처리

  // 쿠키에 토큰 저장
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // 배포 환경에서만 true, 개발 환경에서는 false (개발 환경은 https가 아니므로 쿠키가 전송될 수 없음)
    sameSite: 'strict',
    maxAge: 60 * 60,
    path: '/',
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
