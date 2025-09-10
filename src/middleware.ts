import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/constants';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  if (!accessToken && request.nextUrl.pathname.startsWith(ROUTES.MY_PAGE)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*'],
};
