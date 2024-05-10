'use client';
import { useState, useEffect } from 'react';
import { useUserData } from '@/modules/user-management/contexts/user-data-context';

import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, RotateCcw, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { UserRole, type User } from '@prisma/client';

import type { UserData, UserResult } from '@/server/_user';

import { updateUserRoleAction } from '@/modules/user-management/actions/_user-actions';

import toast from 'react-hot-toast';

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/ui/select';

import { toastStyles } from '@/lib/toast';
import { Label } from '@/ui/label';

const FormSchema = z.object({
    role: z.enum([UserRole.ADMIN, UserRole.USER])
});

interface Props {
    userId: string;
}

const UserRoleForm: React.FC<Props> = ({ userId }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const { users } = useUserData();

    const searchParams = useSearchParams();

    const state = searchParams.get('state');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            role: UserRole.USER
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setError('');
        setSuccess(false);
        //
        const userData = data as UserData;

        try {
            let response: UserResult = {
                Success: false,
                Message: 'Error occurred.'
            };
            if (state === 'edit' && userId) {
                response = await updateUserRoleAction(userId, userData, {
                    selectedPage: searchParams.get('selectedPage') ?? 'roles',
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
            toast.success('User saved successfully!', {
                className: toastStyles
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Unexpected error occurred');
                toast.error('Error saving user: ' + (error.message || ''), {
                    className: toastStyles
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userId && users) {
            const selectedUser = users.find((user) => user.id === userId);

            if (selectedUser) {
                setUser(selectedUser);
                form.setValue('role', UserRole[selectedUser.role as UserRole]);
            }
        }
    }, [userId, users, form, setUser]);

    if (state === 'edit') {
        return (
            <>
                <Label className="text-bold">User</Label>
                <span>{user?.username}</span>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN}>
                                                Admin
                                            </SelectItem>
                                            <SelectItem value={UserRole.USER}>
                                                User
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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

export default UserRoleForm;
