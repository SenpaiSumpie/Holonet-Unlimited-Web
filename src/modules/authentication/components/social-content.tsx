'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const Socials = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    const onClick = async (
        provider: 'google' | 'github' | 'discord' | 'twitter'
    ) => {
        await signIn(provider, {
            callbackUrl: callbackUrl ?? DEFAULT_LOGIN_REDIRECT
        });
    };

    return (
        <div className="flex flex-col w-full gap-y-2">
            <div className="flex items-center w-full gap-x-2">
                <Button
                    size="lg"
                    className="w-full"
                    variant="outline"
                    onClick={() => onClick('google')}
                >
                    <FcGoogle className="h-5 w-5" />
                </Button>
                <Button
                    size="lg"
                    className="w-full"
                    variant="outline"
                    onClick={() => onClick('github')}
                >
                    <FaGithub className="h-5 w-5" />
                </Button>
            </div>
            <div className="flex items-center w-full gap-x-2">
                <Button
                    size="lg"
                    className="w-full"
                    variant="outline"
                    onClick={() => onClick('twitter')}
                >
                    <FaTwitter className="h-5 w-5" />
                </Button>
                <Button
                    size="lg"
                    className="w-full"
                    variant="outline"
                    onClick={() => onClick('discord')}
                >
                    <FaDiscord className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
};

export default Socials;
