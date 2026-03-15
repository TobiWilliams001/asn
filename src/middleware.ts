import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = [
    '/learn/dashboard',
    '/learn/profile',
    '/learn/asap/enroll',
    '/learn/asap/modules',
    '/onboarding',
];

const PUBLIC_PATHS = [
    '/learn',
    '/learn/auth',
    '/learn/coming-soon',
    '/learn/resources',
];

function isProtectedRoute(pathname: string): boolean {
    return PROTECTED_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path + '/')
    );
}

function isPublicRoute(pathname: string): boolean {
    return PUBLIC_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path + '/')
    );
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

    if (isProtectedRoute(pathname)) {
        const sessionCookie = request.cookies.get('__session')?.value;

        if (!sessionCookie) {
            const loginUrl = new URL('/learn/auth/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/learn/:path*', '/onboarding/:path*'],
};
