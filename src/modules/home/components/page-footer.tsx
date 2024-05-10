'use-client';

import React from 'react';

import { Separator } from '@/ui/separator';
import { Button } from '@/ui/button';

import { Twitter, Coffee, Mail, Youtube } from 'lucide-react';
import { PatreonLogo, DiscordLogo } from '@phosphor-icons/react';

export const PageFooter = () => {
    return (
        <div className="mt-auto flex w-full justify-center border-t-2 border-black p-4 dark:border-white">
            <div className="flex flex-col container">
                <div className="flex flex-col">
                    {/* <span className="text-bold text-xl font-star-jedi">
                        socials:
                    </span> */}
                    <div className="flex">
                        <Button size="sm" variant="link">
                            {' '}
                            <Twitter size={22} className="mr-1" />
                            @SenpaiSumpie
                        </Button>

                        <Button size="sm" variant="link">
                            {' '}
                            <PatreonLogo size={22} className="mr-1" />
                            Support
                        </Button>
                        <Button size="sm" variant="link">
                            {' '}
                            <DiscordLogo size={22} className="mr-1" />
                        </Button>

                        {/* <Button size="sm" variant="link">
                            {' '}
                            <Mail size={22} />
                            @SenpaiSumpie
                        </Button> */}
                        <Button size="sm" variant="link">
                            {' '}
                            starwarsunlimited.com{' '}
                        </Button>
                        <Button size="sm" variant="link">
                            {' '}
                            Terms of Service{' '}
                        </Button>
                    </div>
                </div>
                <Separator className="my-2" />
                <span className="font-barlow text-sm">
                    All rights are reserved by their respective owners.
                    <span className="font-bold"> STAR WARS: Unlimited™ </span>
                    is the intellectual property of
                    <span className="font-bold"> Fantasy Flight Games®</span>.
                    <span className="font-bold"> STAR WARS™ </span>
                    is a registered trademark and intellectual property owned by
                    <span className="font-bold"> Disney®</span>.
                    <span className="font-bold"> Imperial Deck Registry </span>{' '}
                    is not endorsed or affiliated with
                    <span className="font-bold">
                        {' '}
                        Fantasy Flight Games®{' '}
                    </span>{' '}
                    or
                    <span className="font-bold"> Disney® </span>
                    in any way.
                </span>
                <Separator className="my-2" />
                <span className="text-sm mt-2 opacity-70">
                    © 2024 Imperial Deck Registry, all other content
                </span>
            </div>
        </div>
    );
};
