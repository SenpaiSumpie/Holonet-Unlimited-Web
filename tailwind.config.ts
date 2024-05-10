import { type Config } from 'tailwindcss';

import {
    aspectRatio,
    keyframes,
    animation,
    colors
} from './src/lib/tailwind-config';

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            aspectRatio: aspectRatio,
            keyframes: keyframes,
            animation: animation,
            transitionDuration: {
                '2000': '2000ms'
            },
            fontSize: {
                'text-header': [
                    '1.25rem',
                    {
                        lineHeight: '1.5rem'
                    }
                ],
                'text-tiny': [
                    '0.65rem',
                    {
                        lineHeight: '0.75rem'
                    }
                ]
            },
            colors: colors,
            fontFamily: {
                sans: ['var(--font-sans)'],
                aurebesh: ['var(--font-aurebesh)'],
                'star-jedi': ['var(--font-star-jedi)']
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
} satisfies Config;
