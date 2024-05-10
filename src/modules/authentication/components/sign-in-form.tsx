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
    CardHeader,
    CardTitle,
    CardFooter
} from '@/ui/card';
import type * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Socials from '@/modules/authentication/components/social-content';
import { FormError } from '@/modules/authentication/components/form-error';
import { FormSuccess } from '@/modules/authentication/components/form-success';

import { Loader2, LogIn, EyeIcon, EyeOffIcon } from 'lucide-react';

import { LoginSchema } from '@/schemas';
import { login } from '@/modules/authentication/actions/_login';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from '@/ui/input-otp';

const SignInForm = () => {
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
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            void login(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }

                    if (data?.success) {
                        setSuccess(data.success);
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch(() => setError('Something went wrong!'));
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
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                    >
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
                                <div className="space-y-2 mb-6">
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
                                                            placeholder="*******"
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
                                                                    (prev) =>
                                                                        !prev
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
                                </div>
                                <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className="px-0 font-normal"
                                >
                                    <Link href="/reset">Forgot Password?</Link>
                                </Button>
                            </>
                        )}

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
                                    <LogIn className="mr-2 h-4 w-4" />
                                    <span>
                                        {showTwoFactor ? 'Confirm' : 'Sign In'}
                                    </span>
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
                <Socials />
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

export default SignInForm;
