import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, refreshToken } = await request.json();
  const cookieStore = await cookies(); // next.js 15에서는 cookies() 비동기 처리

  // 쿠키에 토큰 저장
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // strict에서 lax로 변경하여 더 유연하게
    maxAge: 60 * 60,
    path: '/',
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // strict에서 lax로 변경하여 더 유연하게
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
