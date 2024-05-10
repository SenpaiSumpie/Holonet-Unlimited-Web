'use client';
import { useState, useEffect } from 'react';
import { useCardData } from '@/modules/card-management/contexts/card-data-context';

import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, formatRFC3339 } from 'date-fns';
import { CalendarIcon, Upload, RotateCcw, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { Set } from '@prisma/client';

import type { SetData, SetResult } from '@/server/_sets';

import {
    createSetAction,
    updateSetAction
} from '@/modules/card-management/actions/_set-actions';

import toast from 'react-hot-toast';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Input } from '@/ui/input';
import { Calendar } from '@/ui/calendar';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { toastStyles } from '@/lib/toast';

const FormSchema = z.object({
    name: z.string({
        required_error: 'Name is required.'
    }),
    releaseDate: z.date({
        required_error: 'Release date is required.'
    }),
    abbreviation: z.string({
        required_error: 'Abbreviation is required.'
    }),
    numberOfCards: z.coerce.number({
        required_error: 'Number of cards is required.'
    }),
    setOrder: z.coerce.number({
        required_error: 'Set order is required.'
    }),
    official: z.boolean({
        required_error: 'Official is required.'
    })
});

interface Props {
    setId: string;
}

const SetsForm: React.FC<Props> = ({ setId }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [set, setSet] = useState<Set | null>(null);
    const { sets } = useCardData();

    const searchParams = useSearchParams();

    const state = searchParams.get('state');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            releaseDate: set?.releaseDate ?? new Date(),
            name: set?.name ?? '',
            abbreviation: set?.abbreviation ?? '',
            numberOfCards: set?.numberOfCards ?? 0,
            setOrder: set?.setOrder ?? 0,
            official: set?.official ?? false //eslint-disable-line
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setError('');
        setSuccess(false);
        //
        const setData = data as SetData;

        try {
            let response: SetResult = {
                Success: false,
                Message: 'Error occurred.'
            };
            if (state === 'add') {
                response = await createSetAction(setData, {
                    selectedPage: searchParams.get('selectedPage') ?? 'sets',
                    state: searchParams.get('state') ?? 'none',
                    id: searchParams.get('id') ?? ''
                });
            } else if (state === 'edit' && setId) {
                response = await updateSetAction(setId, setData, {
                    selectedPage: searchParams.get('selectedPage') ?? 'sets',
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
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (setId && sets) {
            const selectedSet = sets.find((set) => set.id === setId);

            if (selectedSet) {
                form.setValue('name', selectedSet.name);
                form.setValue('abbreviation', selectedSet.abbreviation);
                form.setValue('numberOfCards', selectedSet.numberOfCards);
                form.setValue('setOrder', selectedSet.setOrder);
                form.setValue('official', selectedSet.official as boolean);
                form.setValue('releaseDate', selectedSet.releaseDate);
                setSet(selectedSet);
            }
        }
        if (state === 'add') {
            form.reset();
        }
    }, [setId, sets, form, state]);

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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Set Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Set Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="abbreviation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Abbreviation</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Set Abbreviation"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfCards"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Cards</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Number of Cards"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="setOrder"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Set Order</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Set Order"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="releaseDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Release Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full pl-3 text-left font-normal',
                                                        !field.value &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="official"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Official Set?</FormLabel>
                                        <FormDescription>
                                            Is this set an official set or not?
                                        </FormDescription>
                                    </div>
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
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

export default SetsForm;
