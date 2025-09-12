import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ROUTES } from '@/constants';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (!accessToken && request.nextUrl.pathname.startsWith(ROUTES.MY_PAGE)) {
    if (refreshToken) {
      try {
        const res = await fetch('https://sp-globalnomad-api.vercel.app/16-6/auth/tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken.value}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const response = NextResponse.next();

          // 새 accessToken을 쿠키에 저장
          response.cookies.set('accessToken', data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          });

          return response;
        } else {
          // 서버 에러 (!res.ok)
          console.error('[Middleware] 토큰 재발급 API 서버 에러');
        }
      } catch (error) {
        // 네트워크 요청 에러
        console.error('[Middleware] 토큰 재발급 네트워크 에러: ', error);
      }
    }

    // refreshToken이 없거나 재발급 실패 시 로그인 페이지로 리다이렉트
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*', '/'],
};
