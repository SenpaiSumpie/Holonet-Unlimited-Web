'use client';

import Link from 'next/link';

import { Button } from '@/ui/button';
import { Card, CardFooter, CardHeader } from '@/ui/card';

const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <h2>Authentication Error</h2>
            </CardHeader>
            <CardFooter>
                <Button
                    variant="link"
                    className="font-normal w-full"
                    size="sm"
                    asChild
                >
                    <Link href={'/sign-in'}>Back to Sign In</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
export default ErrorCard;
