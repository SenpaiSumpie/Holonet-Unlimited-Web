'use client';

import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/ui/card';
import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { FormSuccess } from './form-success';

import { Loader2, EyeIcon, EyeOffIcon, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NewPasswordSchema } from '@/schemas';
import { FormError } from '@/modules/authentication/components/form-error';

import { newPassword } from '@/modules/authentication/actions/_new-password';

const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const onFormSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            void newPassword(values, token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onFormSubmit)}
                        className="w-full"
                    >
                        <div className="space-y-2 mb-6">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    disabled={isPending}
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="Enter your password"
                                                    className="hide-password-toggle pr-10"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                    disabled={isPending}
                                                >
                                                    {showPassword &&
                                                    !isPending ? (
                                                        <EyeIcon
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <EyeOffIcon
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Re-Enter your password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    disabled={isPending}
                                                    type={
                                                        showConfirmPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="Re-Enter your password"
                                                    className="hide-password-toggle pr-10"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                    disabled={isPending}
                                                >
                                                    {showConfirmPassword &&
                                                    !isPending ? (
                                                        <EyeIcon
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <EyeOffIcon
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            className="w-full mt-6"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Please wait...</span>
                                </>
                            ) : (
                                <>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    <span>Reset Password</span>
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
                <p className="text-center text-sm mt-2 opacity-85">
                    If you don&apos;t have an account, please&nbsp;
                    <Link
                        className="text-blue-500 hover:underline"
                        href="/sign-up"
                    >
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default NewPasswordForm;
