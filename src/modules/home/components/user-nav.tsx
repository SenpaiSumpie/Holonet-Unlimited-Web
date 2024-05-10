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
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.refresh();
    };

    if (session) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src={
                                    session?.user?.image
                                        ? session?.user?.image
                                        : ''
                                }
                                alt="Profile Image"
                            />
                            <AvatarFallback>
                                {session?.user?.name
                                    ? session?.user?.name.charAt(0)
                                    : '??'}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session?.user?.username}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session?.user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href="/settings">
                            <DropdownMenuItem className="hover:cursor-pointer">
                                Settings
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => handleSignOut()}
                        className="hover:cursor-pointer"
                    >
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
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
