import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/constants';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  if (!accessToken && request.nextUrl.pathname.startsWith(ROUTES.MY_PAGE)) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*'],
};
