'use client';

import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
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
    CardFooter,
    CardHeader,
    CardTitle
} from '@/ui/card';
import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { RegisterSchema } from '@/schemas';
import Socials from '@/modules/authentication/components/social-content';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { FormError } from '@/modules/authentication/components/form-error';
import { FormSuccess } from '@/modules/authentication/components/form-success';

import { register } from '@/modules/authentication/actions/_register';

const SignUpForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Email already in use with different provider!'
            : '';

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            void register(values).then((response) => {
                setError(response.error);
                setSuccess(response.success);
            });
        });
    };

    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                    Sign up to use the features of Imperial Deck Registry.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        <div className="space-y-2 mb-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="DarthVaderIsCool"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="darth.vader@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                        <FormError message={error ?? urlError} />
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
                                    <span>Sign up</span>
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
                <Socials />
                <p className="text-center text-sm mt-2 opacity-85">
                    If you already have an account, please&nbsp;
                    <Link
                        className="text-primary-blue hover:underline hover:opacity-95"
                        href="/sign-in"
                    >
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default SignUpForm;
