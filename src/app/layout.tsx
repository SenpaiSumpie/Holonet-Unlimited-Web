import '@/styles/globals.css';
import { aurebesh, starJedi } from '@/lib/fonts';
import { Barlow } from 'next/font/google';

import type { Metadata } from 'next';

import ThemeProvider from '@/modules/home/providers/theme-provider';
import SessionProvider from '@/modules/authentication/providers/session-provider';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { auth } from '@/auth';

import { PageLayout } from '@/modules/home/components/page-layout';

import { Toaster } from 'react-hot-toast';

const _barlow = Barlow({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-sans'
});

export const metadata: Metadata = {
    title: 'Imperial Deck Registry',
    description:
        'The ultimate deck building resource for STAR WARS: UNLIMITED.',
    icons: [{ rel: 'icon', url: '/idr.png' }]
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`font-sans ${_barlow.variable} ${aurebesh.variable} ${starJedi.variable}`}
            >
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster position="bottom-right" />
                        <PageLayout>{children}</PageLayout>
                    </ThemeProvider>
                </SessionProvider>

                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
