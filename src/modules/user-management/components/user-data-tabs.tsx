'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUserData } from '@/modules/user-management/contexts/user-data-context';

import { usePathname, useRouter } from 'next/navigation';

import {
    ImagePlus,
    FilePlus2,
    FileEdit,
    Plus,
    ShieldCheck
} from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { Button } from '@/ui/button';

import UserList from '@/modules/user-management/components/user-list';

const UserManagementTabs = () => {
    const { users } = useUserData();
    const [id, setId] = useState<string>('');
    const [state, setState] = useState<string>('none');
    const [selectedPage, setSelectedPage] = useState<string>('roles');

    const router = useRouter();
    const pathname = usePathname();
    const page = pathname.replace('/tools/user-management/', '');

    const changeId = (id: string) => {
        setId(id);
    };

    const changeState = (state: string) => {
        setState(state);
    };

    const handleTabClick = (value: string) => {
        setSelectedPage(value);
    };
    const navigateToUrl = useCallback(() => {
        router.push(
            `/tools/user-management/${selectedPage}?state=${state}&id=${id}`
        );
    }, [router, selectedPage, state, id]);

    useEffect(() => {
        navigateToUrl();
    }, [navigateToUrl]);

    return (
        <div className="flex flex-col">
            <div className="flex mb-2">
                <Tabs defaultValue={selectedPage || 'roles'}>
                    <TabsList>
                        <TabsTrigger
                            value="roles"
                            onClick={() => handleTabClick('roles')}
                        >
                            <ShieldCheck size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">Roles</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <UserList
                page={page}
                users={users}
                changeId={changeId}
                changeState={changeState}
            />
        </div>
    );
};

export default UserManagementTabs;
