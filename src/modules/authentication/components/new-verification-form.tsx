'use client';

import { useCallback, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/ui/card';
import { Loader2 } from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/modules/authentication/actions/_new_verification';

import { FormError } from '@/modules/authentication/components/form-error';
import { FormSuccess } from '@/modules/authentication/components/form-success';

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const onSubmit = useCallback(() => {
        if (!token) {
            setError('Missing token!');
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError('Something went wrong');
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Verify Email</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="w-full flex justify-center">
                    {!success && !error && (
                        <Loader2 className="h-10 w-10 animate-spin" />
                    )}

                    <FormSuccess message={success} />
                    {!success && <FormError message={error} />}
                </CardDescription>
            </CardContent>
        </Card>
    );
};
