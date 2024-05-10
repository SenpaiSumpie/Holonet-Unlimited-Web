import type { ReactElement } from 'react';

import type { NextPage } from 'next';
import UserManagementTabs from '@/modules/user-management/components/user-data-tabs';
import { UserDataProvider } from '@/modules/user-management/contexts/user-data-context';

import { getUsers } from '@/server/_user';

interface CardsPageProps {
    children: ReactElement;
}

const UserManagementLayout: NextPage<CardsPageProps> = async ({ children }) => {
    const { Users = [] } = await getUsers();

    return (
        <UserDataProvider users={Users} loading={false}>
            <div className="container flex w-full flex-grow pb-8 pt-8 gap-4">
                <div className="basis-2/3">{children}</div>
                <div className="basis-1/3">
                    <UserManagementTabs />
                </div>
            </div>
        </UserDataProvider>
    );
};

export default UserManagementLayout;
