import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/components/_lib/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/home', '/new-reservation'];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 4. Redirect logic
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (session?.userId) {
    if (isPublicRoute || path === '/') {
      return NextResponse.redirect(new URL('/home', req.nextUrl));
    }
  } else if (path === '/') {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

// 5. Apply middleware globally
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};