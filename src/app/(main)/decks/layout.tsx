'use client';

import type { ReactNode } from 'react';

import type { NextPage } from 'next';

import { usePathname, useRouter } from 'next/navigation';

import {
    Heart,
    Sparkles,
    BookHeart,
    Medal,
    FilePlus2,
    Download,
    FlaskConical
} from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';

interface CardsPageProps {
    children: ReactNode;
}

const DeckLayout: NextPage<CardsPageProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const page = pathname.replace('/decks/', '');

    const handleTabClick = (value: string) => {
        router.push(`/decks/${value}`);
    };

    return (
        <div className="container flex w-full flex-grow pb-8 pt-8">
            <div className="w-full">
                <Tabs defaultValue={page || 'public'}>
                    <TabsList>
                        <TabsTrigger
                            value="public"
                            onClick={() => handleTabClick('public')}
                        >
                            <Sparkles size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">PUBLIC</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="tournament"
                            onClick={() => handleTabClick('tournament')}
                        >
                            <Medal size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">TOURNAMENT</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="personal"
                            onClick={() => handleTabClick('personal')}
                        >
                            <BookHeart size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">PERSONAL</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            onClick={() => handleTabClick('favorites')}
                        >
                            <Heart size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">FAVORITES</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="create"
                            onClick={() => handleTabClick('create')}
                        >
                            <FilePlus2 size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">CREATE</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="import"
                            onClick={() => handleTabClick('import')}
                        >
                            <Download size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">IMPORT</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="generate"
                            onClick={() => handleTabClick('generate')}
                        >
                            <FlaskConical size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">HOLOCRON</span>
                            <span className="text-xs font-bold ml-1">
                                (BETA)
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                {children}
            </div>
        </div>
    );
};

export default DeckLayout;
