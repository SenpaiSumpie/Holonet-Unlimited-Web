'use client';
import { useState } from 'react';

import type { User } from '@prisma/client';

import { useSearchParams } from 'next/navigation';

import { ScrollArea } from '@/ui/scroll-area';
import { Button } from '@/ui/button';

import { Search } from 'lucide-react';

import { Input } from '@/ui/input';

interface Props {
    page: string;
    users: User[];
    changeId: (id: string) => void;
    changeState: (state: string) => void;
}

const UserList: React.FC<Props> = ({ page, users, changeId, changeState }) => {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const selectItem = (newId: string, newState: string) => {
        changeId(newId);
        changeState(newState);
    };

    const sortedUsers = [...users].sort((a, b) =>
        (b.username ?? '').localeCompare(a.username ?? '')
    );

    const filteredUsers = sortedUsers.filter((user) =>
        (user.username ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (page === 'roles') {
        return (
            <ScrollArea className="h-[500px]">
                <div className="w-full">
                    <div className="space-y-1">
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search users..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                            />
                        </div>
                        {filteredUsers.map((user: User, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant={
                                        user.id === searchParams.get('id')
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    onClick={() => selectItem(user.id, 'edit')} //eslint-disable-line
                                    className="w-full justify-start"
                                >
                                    {user.username}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </ScrollArea>
        );
    }

    return <div>Loading...</div>;
};

export default UserList;
