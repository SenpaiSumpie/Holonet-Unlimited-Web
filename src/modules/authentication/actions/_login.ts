'use server';

import type * as z from 'zod';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { getUserByEmail } from '@/server/_user';
import type { User } from '@prisma/client';

import {
    generateTwoFactorToken,
    generateVerificationToken
} from '@/lib/tokens';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/modules/authentication/actions/_two-factor-token';
import { getTwoFactorConfirmationByUserId } from '@/modules/authentication/actions/_two-factor-confirmation';

import prisma from '@/lib/prisma';

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = (await getUserByEmail(email)) as User;

    if (!existingUser?.email || !existingUser?.password) {
        return { error: 'Email does not exist' };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: 'Confirmation email sent!' };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );

            if (!twoFactorToken) {
                return { error: 'Invalid code' };
            }

            if (twoFactorToken.token !== code) {
                return { error: 'Invalid code' };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: 'Code has expired' };
            }

            await prisma?.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await prisma.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await prisma.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(
                existingUser.email
            );
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            );

            return { twoFactor: true };
        }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid Credentials' };
                default:
                    return { error: 'Something went wrong!' };
            }
        }

        throw error;
    }
};
