import React from 'react';

import UserRoleForm from '@/modules/user-management/components/user-role-form';

const RolesPage = ({ searchParams }: { searchParams?: { id?: string } }) => {
    const id = searchParams?.id;

    return (
        <>
            <UserRoleForm userId={id ?? ''} />
        </>
    );
};

export default RolesPage;
