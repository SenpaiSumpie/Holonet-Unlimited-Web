'use client';

import type { PropsWithChildren } from 'react';

import { PageHeader } from './page-header';
import { PageFooter } from './page-footer';

export const PageLayout = (props: PropsWithChildren) => {
    return (
        <main className="bg-white dark:bg-transparent">
            <div className="z-2 min-h-screen flex flex-col">
                <PageHeader />
                {props.children}
                {/* <PageFooter /> */}
            </div>
        </main>
    );
};
