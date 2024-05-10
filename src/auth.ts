import NextAuth from 'next-auth';
import type { User, UserRole } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/lib/prisma';
import authConfig from '@/auth.config';
import { getUserById } from '@/server/_user';
import { getTwoFactorConfirmationByUserId } from '@/modules/authentication/actions/_two-factor-confirmation';
import { getAccountByUserId } from '@/server/_account';

import { generateFromEmail } from 'unique-username-generator';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: '/sign-in',
        error: '/error'
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (
                account?.provider === 'github' ||
                account?.provider === 'google'
            ) {
                if (!(user as User).username) {
                    const username = generateFromEmail(user.email ?? '');
                    (user as User).username = username;
                }
            }

            // Allow OAuth without email verification
            if (account?.provider !== 'credentials') return true;

            const existingUser = (await getUserById(user.id ?? '')) as User;

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) return false;

                // Delete two factor confirmation for next sign in
                await prisma.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled =
                    token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.username = (token.username as string) ?? '';
                session.user.email = token.email ?? '';
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = (await getUserById(token.sub)) as User;

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.username = existingUser.username;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig
});
