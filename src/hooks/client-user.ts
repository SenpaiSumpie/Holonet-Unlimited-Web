import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';

export const userInfo = () => {
    return 'user';
};

export const isUserAdmin = () => {
    return 'false';
};
