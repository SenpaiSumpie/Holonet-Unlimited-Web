'use server';

import type * as z from 'zod';

import prisma from '@/lib/prisma';
import type { SettingsSchema } from '@/schemas';
import { getUserById } from '@/server/_user';
import { currentUser } from '@/lib/auth';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const existingUser = await getUserById(user?.id ?? '');

    if (!existingUser) {
        return { error: 'Unauthorized' };
    }

    await prisma.user.update({
        where: { id: user?.id ?? '' },
        data: {
            ...values
        }
    });

    return { success: 'Settings updated' };
};
