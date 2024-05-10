import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req): void | Response | Promise<void | Response> => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // Allow Auth routes
    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    // TODO: App will for the most part be public, so I don't need to have them all hidden
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
