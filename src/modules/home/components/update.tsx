'use client';

import React from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/ui/alert-dialog';

import toast from 'react-hot-toast';

export const UpdateComponent = () => {
    const [open, setOpen] = React.useState<boolean | undefined>();

    const updateBadFeeling = () => {
        toast.error('Thats no moon'); // eslint-disable-line
    };

    const updateThisIsTheWay = () => {
        toast.success('This is the way!'); //eslint-disable-line
    };

    // const createPost = api.post.create.useMutation();

    React.useEffect(() => {
        if (open === undefined) {
            setOpen(true);
        }
    }, [open]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Website In Progress - 11/6/2023 (Last Update)
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Hello! Welcome to Imperial Deck Registry. Sorry the
                        website has minimal features but I am working hard to
                        get them up and running! You can view the Roadmap page
                        under the About section to see what I am working on and
                        time estimates!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => updateBadFeeling()}>
                        I got a bad feeling about this
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => updateThisIsTheWay()}>
                        This is the way
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
