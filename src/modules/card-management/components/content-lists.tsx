import type { Set, Card } from '@prisma/client';

import { useSearchParams } from 'next/navigation';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/ui/alert-dialog';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/ui/accordion';

import { ScrollArea } from '@/ui/scroll-area';
import { Button } from '@/ui/button';
import toast from 'react-hot-toast';
import { toastStyles } from '@/lib/toast';

import { Trash2 } from 'lucide-react';

import { deleteSetAction } from '@/modules/card-management/actions/_set-actions';

import type { SetResult } from '@/server/_sets';
import { CardResult } from '@/server/_cards';
import { deleteCardAction } from '../actions/_card-actions';
import { CardManagementURL } from '@/types/path-urls';

interface Props {
    page: string;
    sets: Set[];
    cards: Card[];
    changeId: (id: string) => void;
    changeState: (state: string) => void;
}

const ContentLists: React.FC<Props> = ({
    page,
    sets,
    cards,
    changeId,
    changeState
}) => {
    const searchParams = useSearchParams();

    const selectItem = (newId: string, newState: string) => {
        changeId(newId);
        changeState(newState);
    };

    async function deleteItem(id: string) {
        if (!id) {
            return;
        }

        try {
            if (page === 'sets') {
                let response: SetResult = {
                    Success: false,
                    Message: 'Error occurred.'
                };
                response = await deleteSetAction(id, {
                    selectedPage: searchParams.get('selectedPage') ?? 'sets',
                    state: searchParams.get('state') ?? 'none',
                    id: searchParams.get('id') ?? ''
                });

                if (!response.Success) {
                    toast.error(response.Message, {
                        className: toastStyles
                    });
                    return;
                }

                toast.success('Set Deleted successfully!', {
                    className: toastStyles
                });
            } else if (page === 'cards') {
                let response: CardResult = {
                    Success: false,
                    Message: 'error occured'
                };

                response = await deleteCardAction(id, {
                    selectedPage: searchParams.get('selectedPage') ?? 'cards',
                    state: searchParams.get('state') ?? 'none',
                    id: searchParams.get('id') ?? ''
                });
                if (!response.Success) {
                    toast.error(response.Message, {
                        className: toastStyles
                    });
                    return;
                }
                toast.success('Carde deleted successfully', {
                    className: toastStyles
                });
            } else {
                toast.error('Invalid Page Error.', {
                    className: toastStyles
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Error saving set: ' + (error.message || ''), {
                    className: toastStyles
                });
            }
        }

        selectItem('', 'none');
    }

    if (page === 'cards') {
        const sortedSets = [...sets].sort((a, b) => a.setOrder - b.setOrder);

        return (
            <ScrollArea className="h-[500px]">
                <Accordion type="single" collapsible className="w-full">
                    {sortedSets.map((set: Set, index) => {
                        const filteredCards = cards.filter(
                            (card) => card.setId === set.id
                        );
                        console.log('Cards', cards);
                        console.log('Filtered Cards', filteredCards);

                        return (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>
                                    <span className="ml-4">
                                        {set.name} ({filteredCards.length}/
                                        {set.numberOfCards})
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="w-full">
                                        <div className="space-y-1">
                                            {cards.map((card: Card, index) => {
                                                return (
                                                    <Button
                                                        key={index}
                                                        variant={
                                                            card.id ===
                                                            searchParams.get(
                                                                'id'
                                                            )
                                                                ? 'secondary'
                                                                : 'ghost'
                                                        }
                                                        onClick={() =>
                                                            selectItem(
                                                                card.id,
                                                                'edit'
                                                            )
                                                        }
                                                        className="w-full justify-start"
                                                    >
                                                        {card.name}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild
                                                            >
                                                                <Trash2 className="ml-auto w-4 h-4 hover:opacity-100 opacity-50 " />
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Are you
                                                                        sure you
                                                                        want to
                                                                        delete{' '}
                                                                        {
                                                                            card.name
                                                                        }
                                                                        ?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This
                                                                        action
                                                                        cannot
                                                                        be
                                                                        undone.
                                                                        This
                                                                        will
                                                                        permanently
                                                                        delete
                                                                        your
                                                                        account
                                                                        and
                                                                        remove
                                                                        your
                                                                        data
                                                                        from our
                                                                        servers.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>
                                                                        Cancel
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => {
                                                                            return deleteItem(
                                                                                card.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        Continue
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </ScrollArea>
        );
    }

    if (page === 'images') {
        const sortedSets = [...sets].sort((a, b) => a.setOrder - b.setOrder);

        return (
            <ScrollArea className="h-[500px]">
                <div className="w-full">
                    <div className="space-y-1">
                        {sortedSets.map((set: Set, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant={
                                        set.id === searchParams.get('id')
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    onClick={() => selectItem(set.id, 'none')} //eslint-disable-line
                                    className="w-full justify-start"
                                >
                                    {set.setOrder}. {set.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </ScrollArea>
        );
    }

    if (page === 'sets') {
        const sortedSets = [...sets].sort((a, b) => a.setOrder - b.setOrder);

        return (
            <ScrollArea className="h-[500px]">
                <div className="w-full">
                    <div className="space-y-1">
                        {sortedSets.map((set: Set, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant={
                                        set.id === searchParams.get('id')
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    onClick={() => selectItem(set.id, 'edit')} //eslint-disable-line
                                    className="w-full justify-start"
                                >
                                    {set.setOrder}. {set.name} (
                                    {set.official ? 'Official' : 'Custom'})
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Trash2 className="ml-auto w-4 h-4 hover:opacity-100 opacity-50" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you sure you want to
                                                    delete {set.name}?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete your
                                                    account and remove your data
                                                    from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        deleteItem(set.id)
                                                    }
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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

export default ContentLists;
