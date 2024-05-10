'use client';
import React, { FC, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldErrors, useForm } from 'react-hook-form';
import * as z from 'zod';

import type { Set, Card } from '@prisma/client';
import { ArenaValues, RarityValues } from '@prisma/client';
import { CardsSchema } from '@/schemas';

import { Loader, RotateCcw, Upload } from 'lucide-react';

import { Button } from '@/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/ui/form';
import { Input } from '@/ui/input';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/ui/select';

import { Switch } from '@/ui/switch';
import { CardData, CardResult } from '@/server/_cards';
import { useSearchParams } from 'next/navigation';
import { createCardAction, updateCardAction } from '../actions/_card-actions';
import toast from 'react-hot-toast';
import { toastStyles } from '@/lib/toast';
import { useCardData } from '../contexts/card-data-context';

interface Props {
    cardId: string;
}
const CardsForms: FC<Props> = ({ cardId }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [card, setCard] = useState<Card | null>(null);
    const { cards, sets } = useCardData();
    const searchParams = useSearchParams();

    const state = searchParams.get('state');
    // 1. Define your form.
    const form = useForm<z.infer<typeof CardsSchema>>({
        resolver: zodResolver(CardsSchema),
        defaultValues: {
            setId: card?.setId ?? '',
            cardNumber: card?.cardNumber ?? 0,
            name: card?.name ?? '',
            subtitle: card?.subtitle ?? '',
            type: card?.type ?? '',
            arena: ArenaValues.GROUND,
            cost: card?.cost ?? 0,
            power: card?.power ?? 0,
            health: card?.health ?? 0,
            rarity: RarityValues.COMMON,
            // frontText: card?.frontText ?? '',
            // backText: card?.backText ?? '',
            // epicAction: card?.epicAction ?? '',
            doubleSided: card?.doubleSided ?? false,
            token: card?.token ?? false,
            unique: card?.unique ?? false,
            // artist: card?.artist ?? '',
            frontImgUrl: card?.frontImgUrl ?? ''
            // backImgUrl: card?.backImgUrl ?? '',
            // hyperspaceUrl: card?.hyperspaceUrl ?? '',
            // hyperspaceBackUrl: card?.hyperspaceBackUrl ?? '',
            // banned: card?.banned ?? false,
            // createdAt: card?.createdAt ?? new Date(),
            // updatedAt: card?.updatedAt ?? new Date()
        }
    });

    // 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof CardsSchema>) {
        console.log('Onsubmit called');
        setIsLoading(true);
        setError('');
        setSuccess(false);
        const cardData: CardData = {
            ...data
        };

        try {
            // Create cardResponse
            let response: CardResult = {
                Success: false,
                Message: 'Error Occurred'
            };
            //Create
            if (state === 'add') {
                //Create CardAction
                response = await createCardAction(cardData, {
                    selectedPage: searchParams.get('selectedPage') ?? 'cards',
                    state: searchParams.get('state') ?? 'none',
                    id: searchParams.get('id') ?? ''
                });
            }
            //Get Card Ids
            else if (state === 'edit') {
                response = await updateCardAction(cardId, cardData, {
                    selectedPage: searchParams.get('selectedPage') ?? 'cards',
                    state: searchParams.get('state') ?? 'none',
                    id: searchParams.get('id') ?? ''
                });
            }

            if (!response.Success) {
                toast.error(response.Message, {
                    className: toastStyles
                });
                return;
            }
            setSuccess(true);
            toast.success('Set saved successfully!', {
                className: toastStyles
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Unexpected error occurred');
                toast.error('Error saving set: ' + (error.message || ''), {
                    className: toastStyles
                });
            }
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (cards) {
            const selectedCard = cards.find((card) => card.id === cardId);
            if (selectedCard) {
                form.setValue('name', selectedCard.name);
                form.setValue('cardNumber', selectedCard.cardNumber);
                form.setValue('frontImgUrl', selectedCard.frontImgUrl ?? '');
                setCard(selectedCard);
            }
        }
    }, [cards, form, cardId]);

    if (state === 'add' || state === 'edit') {
        return (
            <>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="setId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Set</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a set" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sets.map((set) => (
                                                <SelectItem
                                                    key={set.id}
                                                    value={set.id}
                                                >
                                                    {set.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="power"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Power</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="health"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Health</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Card Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subtitle</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Subtitle"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Card Type"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="arena"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an arena" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                value={ArenaValues.SPACE}
                                            >
                                                Space
                                            </SelectItem>
                                            <SelectItem
                                                value={ArenaValues.GROUND}
                                            >
                                                Ground
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cost"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="frontImgUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Image Url</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Card Image Url"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex w-full ml-auto gap-1">
                            <Button type="reset" onClick={() => form.reset()}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        <span>Please wait...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        <span>Submit</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </>
        );
    }
    if (state === 'none') {
        return <div>No data selected to be edited, please select data.</div>;
    }

    return <div>error loading data</div>;
};

export { CardsForms as CardsForms2 };
