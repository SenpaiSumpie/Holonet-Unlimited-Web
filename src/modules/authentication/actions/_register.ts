'use server';

import prisma from '@/lib/prisma';
import type * as z from 'zod';
import bcrypt from 'bcryptjs';

import { RegisterSchema } from '@/schemas';

import { getUserByEmail, getUserByUsername } from '../../../server/_user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { username, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
        return { error: 'Email already in use!' };
    }

    const existingUsername = await getUserByUsername(username);

    if (existingUsername) {
        return { error: 'Username already in use!' };
    }

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return { success: 'Confirmation email sent!' };
};
