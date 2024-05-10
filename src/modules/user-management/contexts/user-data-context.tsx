'use client';

import React, { createContext, useContext } from 'react';

import type { User } from '@prisma/client';

interface UserDataProviderProps {
    children: React.ReactNode;
    users: User[];
    loading: boolean;
}

const UserDataContext = createContext<{
    users: User[];
    loading: boolean;
}>({
    users: [],
    loading: true
});

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
    children,
    users,
    loading
}) => {
    return (
        <UserDataContext.Provider value={{ users, loading }}>
            {children}
        </UserDataContext.Provider>
    );
};
