import { auth } from '@/auth';
import { UserRole } from '@prisma/client';

export const userInfo = async () => {
    const session = await auth();

    return session?.user;
};

export const isUserAdmin = async () => {
    const user = await userInfo();

    return user?.role === UserRole.ADMIN ?? false;
};
