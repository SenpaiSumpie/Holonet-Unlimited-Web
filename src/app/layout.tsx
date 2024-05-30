import '@/styles/globals.css';
import { aurebesh, starJedi } from '@/lib/fonts';
import { Barlow } from 'next/font/google';

import type { Metadata } from 'next';

import Script from 'next/script';

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
                <Script
                    src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
                    strategy="beforeInteractive"
                />
                <Script id="kofi-donations" strategy="beforeInteractive">
                    {`kofiWidgetOverlay.draw('holonet', {
                        'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support Us',
    'floating-chat.donateButton.background-color': '#ffffff',
    'floating-chat.donateButton.text-color': '#323842'
                    });`}
                </Script>
            </body>
        </html>
    );
}
