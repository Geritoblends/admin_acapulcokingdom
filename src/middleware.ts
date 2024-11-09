import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/components/_lib/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/home', '/new-reservation'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }

  if (req.nextUrl.pathname === "/"){
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
    matcher: '/',  // This will match all routes, applying middleware globally
  };
  