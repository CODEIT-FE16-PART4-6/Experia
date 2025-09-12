import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ROUTES } from '@/constants';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // 마이페이지 접근 시 토큰 확인
  if (request.nextUrl.pathname.startsWith(ROUTES.MY_PAGE)) {
    // 액세스 토큰이나 리프레시 토큰 중 하나라도 있으면 통과
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL(ROUTES.LOGIN, request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*'],
};
