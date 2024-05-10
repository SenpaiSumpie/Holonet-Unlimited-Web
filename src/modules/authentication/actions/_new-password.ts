'use server';

import type * as z from 'zod';
import bcrypt from 'bcryptjs';

import type { User } from '@prisma/client';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/modules/authentication/actions/_password-reset-token';
import { getUserByEmail } from '@/server/_user';
import prisma from '@/lib/prisma';

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: 'Missing token!' };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: 'Invalid token!' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token has expired!' };
    }

    const existingUser = (await getUserByEmail(existingToken.email)) as User;

    if (!existingUser) {
        return { error: 'Email does not exist!' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    });

    await prisma.passwordResetToken.delete({
        where: { id: existingToken.id }
    });

    return { success: 'Password updated!' };
};
