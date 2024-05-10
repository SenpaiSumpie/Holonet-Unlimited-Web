'use server';

import prisma from '@/lib/prisma';
import { getUserByEmail } from '@/server/_user';
import { getVerificationTokenByToken } from '@/modules/authentication/actions/_verification-token';

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: 'Invalid token' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email not found' };
    }

    await prisma.user.update({
        where: { email: existingToken.email },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await prisma.verificationToken.delete({
        where: { id: existingToken.id }
    });

    return { success: 'Email verified!' };
};
