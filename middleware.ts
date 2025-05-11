import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // If it's the login path, don't check for auth
  if (path === '/admin/login') {
    return NextResponse.next();
  }
  
  // Check if it's an admin path
  const isAdminPath = path.startsWith('/admin');
  
  // Check if user is authenticated by looking for the admin-session cookie
  // Note: request.cookies is synchronous and doesn't need await
  const adminSession = request.cookies.get('admin-session');
  
  // If it's an admin path but not authenticated, redirect to login
  if (isAdminPath && !adminSession) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
}; 