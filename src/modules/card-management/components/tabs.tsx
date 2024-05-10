'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCardData } from '@/modules/card-management/contexts/card-data-context';

import { usePathname, useRouter } from 'next/navigation';

import { ImagePlus, FilePlus2, FileEdit, Plus } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import { Button } from '@/ui/button';

import ContentLists from '@/modules/card-management/components/content-lists';

const CardManagementTabs = () => {
    const { sets, cards } = useCardData();
    const [id, setId] = useState<string>('');
    const [state, setState] = useState<string>('none');
    const [selectedPage, setSelectedPage] = useState<string>('cards');

    const router = useRouter();
    const pathname = usePathname();
    const page = pathname.replace('/tools/card-management/', '');

    const changeId = (id: string) => {
        setId(id);
    };

    const changeState = (state: string) => {
        setState(state);
    };

    const handleTabClick = (value: string) => {
        setSelectedPage(value);
    };

    const addNewItem = () => {
        setState('add');
        setId('');
    };

    const navigateToUrl = useCallback(() => {
        router.push(
            `/tools/card-management/${selectedPage}?state=${state}&id=${id}`
        );
    }, [router, selectedPage, state, id]);

    useEffect(() => {
        navigateToUrl();
    }, [navigateToUrl]);

    return (
        <div className="flex flex-col">
            <div className="flex mb-2">
                <Tabs defaultValue={selectedPage || 'cards'}>
                    <TabsList>
                        <TabsTrigger
                            value="cards"
                            onClick={() => handleTabClick('cards')}
                        >
                            <FilePlus2 size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">Cards</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="images"
                            onClick={() => handleTabClick('images')}
                        >
                            <FileEdit size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">Formats</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="sets"
                            onClick={() => handleTabClick('sets')}
                        >
                            <ImagePlus size={4} className="mr-2 h-4 w-4" />
                            <span className="font-bold">Sets</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                {(selectedPage === 'cards' || selectedPage === 'sets') && (
                    <Button className="ml-auto" onClick={() => addNewItem()}>
                        <Plus size={4} className="mr-2 h-4 w-4" />
                        New
                    </Button>
                )}
            </div>
            <ContentLists
                page={page}
                sets={sets}
                cards={cards}
                changeId={changeId}
                changeState={changeState}
            />
        </div>
    );
};

export default CardManagementTabs;
