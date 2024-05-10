import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';

export const userInfo = () => {
    const session = useSession();

    return session.data?.user;
};

export const isUserAdmin = () => {
    const session = useSession();

    return session.data?.user?.role === UserRole.ADMIN ?? false;
};
