'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/ui/dropdown-menu';

const AuthButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.refresh();
    };

    return (
        <div className="flex gap-x-2">
            {/* <Button size="sm" variant="ghost" onClick={() => signIn()}>
                Log In
            </Button> */}
            <Link href="/sign-in">
                <Button size="sm" variant="ghost">
                    Log In
                </Button>
            </Link>
            <Link href="/sign-up">
                <Button size="sm" variant="ghost">
                    Register
                </Button>
            </Link>
        </div>
    );
};

const UserNav = () => {
    return <AuthButton />;
};

export default UserNav;
