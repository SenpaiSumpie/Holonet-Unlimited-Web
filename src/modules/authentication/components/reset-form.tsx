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

import { Loader2, LogIn, EyeIcon, Send } from 'lucide-react';
import Link from 'next/link';

import { OTPSchema, ResetSchema } from '@/schemas';
import { reset } from '@/modules/authentication/actions/_reset';
import { FormError } from '@/modules/authentication/components/form-error';

const ResetForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const emailForm = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ''
        }
    });

    const otpForm = useForm<z.infer<typeof OTPSchema>>({
        resolver: zodResolver(OTPSchema),
        defaultValues: {
            pin: ''
        }
    });

    const onSubmitOtpForm = (values: z.infer<typeof OTPSchema>) => {
        console.log(values);
    };

    const onSubmitEmailForm = (values: z.infer<typeof ResetSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            void reset(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Sign in to use the features of Imperial Deck Registry.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...emailForm}>
                    <form
                        onSubmit={emailForm.handleSubmit(onSubmitEmailForm)}
                        className="w-full"
                    >
                        <div className="space-y-2 mb-6">
                            <FormField
                                control={emailForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="john.doe@example.com"
                                                {...field}
                                            />
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
                                    <Send className="mr-2 h-4 w-4" />
                                    <span>Send Reset Email</span>
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

export default ResetForm;
