'use client';

import React from 'react';
import Image from 'next/image';

import { Input } from '@/ui/input';
import { Toggle } from '@/ui/toggle';
import { ScrollArea } from '@/ui/scroll-area';
import { Button } from '@/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/ui/select';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { SlidersHorizontal } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from '@/ui/dropdown-menu';
import { BackgroundGradient } from '@/modules/decks/components/background-gradient';

const PublicDeckPage = () => {
    return (
        <div>
            <div className="flex pt-4 gap-2">
                <Input
                    placeholder="Filter decks..."
                    value=""
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <Select>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="est">Standard</SelectItem>
                            <SelectItem value="cst">Multiplayer</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/* TODO: Add facited filter from Shadcn UI Example */}
                <Toggle aria-label="Aggression">
                    <Image
                        src="/icons/Aggression.png"
                        width={25}
                        height={25}
                        alt="Picture of the author"
                    />
                </Toggle>
                <Toggle aria-label="Command">
                    <Image
                        src="/icons/Command.png"
                        width={25}
                        height={25}
                        alt="Picture of the author"
                    />
                </Toggle>
                <Toggle aria-label="Cunning">
                    <Image
                        src="/icons/Cunning.png"
                        width={25}
                        height={25}
                        alt="Picture of the author"
                    />
                </Toggle>
                <Toggle aria-label="Heroism">
                    <Image
                        src="/icons/Heroism.png"
                        width={25}
                        height={25}
                        alt="Picture of the author"
                    />
                </Toggle>
                <Toggle aria-label="Vigilance">
                    <Image
                        src="/icons/Vigilance.png"
                        width={25}
                        height={25}
                        alt="Picture of the author"
                    />
                </Toggle>
                <Toggle aria-label="Villainy">
                    <Image
                        src="/icons/Villainy.png"
                        width={25}
                        height={25}
                        alt="Picture of the author"
                    />
                </Toggle>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto hidden h-8 lg:flex"
                        >
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px]">
                        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem className="capitalize">
                            Hello
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ScrollArea>
                <div className="grid grid-cols-3 gap-16 grid-flow-row">
                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>
                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>

                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>

                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>
                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>
                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>

                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>

                    <BackgroundGradient className="rounded-[16px] p-4 bg-white dark:bg-zinc-900">
                        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            Air Jordan 4 Retro Reimagined
                        </p>

                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                            <span>Buy now </span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                $100
                            </span>
                        </button>
                    </BackgroundGradient>
                </div>

                {/* TODO: Fix styling of the Deck Card Components */}
                {/* <div className="[border-image:linear-gradient(to_right,#FF0202,#820181,#0500FF)_30] border-4 border-solid border-transparent bg-transparent rounded-lg w-[596px] h-[211px]">
                    <svg
                        className="absolute top-0 left-0 z-[-1]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="361"
                        height="94"
                        viewBox="0 0 361 94"
                        fill="none"
                    >
                        <path
                            d="M0 94V0H361L298.315 94H0Z"
                            fill="url(#paint0_linear_102_5)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_102_5"
                                x1="-1.18525e-06"
                                y1="47.1627"
                                x2="586.5"
                                y2="46.9999"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#FF0202" />
                                <stop offset="1" stop-color="#0500FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div> */}
            </ScrollArea>
        </div>
    );
};

export default PublicDeckPage;
