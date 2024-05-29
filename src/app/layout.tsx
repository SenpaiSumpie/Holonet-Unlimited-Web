import '@/styles/globals.css';
import { aurebesh, starJedi } from '@/lib/fonts';
import { Barlow } from 'next/font/google';

import type { Metadata } from 'next';

import ThemeProvider from '@/modules/home/providers/theme-provider';

import { PageLayout } from '@/modules/home/components/page-layout';

import { Toaster } from 'react-hot-toast';

const _barlow = Barlow({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-sans'
});

export const metadata: Metadata = {
    title: 'Holonet Unlimited',
    description: 'The ultimate deck testing resource for STAR WARS: UNLIMITED.',
    icons: [{ rel: 'icon', url: '/idr.png' }]
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`font-sans ${_barlow.variable} ${aurebesh.variable} ${starJedi.variable}`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster position="bottom-right" />
                    <PageLayout>{children}</PageLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
