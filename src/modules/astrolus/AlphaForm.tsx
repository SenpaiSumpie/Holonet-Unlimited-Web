'use client';

import { useState, type FormEvent } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Loader2, Pen } from 'lucide-react';

const AlphaForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/alpha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            //eslint-disable-next-line
            const data = await res.json();

            if (res.status === 201) {
                toast.success('Signed up successfully!');
            } else {
                //eslint-disable-next-line
                toast.error(data.message || 'Error occurred.');
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Error: ' + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex w-full max-w-lg items-center space-x-2 pb-2">
                <h1>Sign up for the Alpha today!</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-lg items-center space-x-2"
            >
                <Input
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Please wait...</span>
                        </>
                    ) : (
                        <>
                            <Pen className="mr-2 h-4 w-4" />
                            <span>Sign Up</span>
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default AlphaForm;
