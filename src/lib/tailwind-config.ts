export const animation = {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'caret-blink': 'caret-blink 1.25s ease-out infinite'
};

export const aspectRatio = {
    '3/2': '3 / 2',
    '2/3': '2 / 3'
};

export const colors = {
    border: 'hsl(var(--border))',
    muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
    },

    destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
    },
    accent: 'hsl(240, 4.8%, 95.9%)',
    'accent-foreground': 'hsl(240, 5.9%, 10%)',
    'accent-dark': 'hsl(240 3.7% 15.9%)',
    'accent-dark-foreground': 'hsl(0 0% 98%)',

    'muted-dark': 'hsl(240, 3.7%, 15.9%)',
    'muted-dark-foreground': 'hsl(240, 5%, 64.9%)',
    'muted-light': 'hsl(240, 4.8%, 95.9%)',
    'muted-light-foreground': 'hsl(240, 3.8%, 46.1%)',

    'primary-blue': '#0072F5',

    'command-color-dark': '#1A7945',
    'command-color-light': '#1A9F52',
    'aggression-color-dark': '#B70C0E',
    'aggression-color-light': '#D05753',
    'vigilance-color-dark': '#3983C5',
    'vigilance-color-light': '#899BCF',
    'cunning-color-dark': '#D49241',
    'cunning-color-light': '#D9A85D',
    'heroism-color-dark': '#B5AE75',
    'heroism-color-light': '#C0B97D',
    'villainy-color-dark': '#151025',
    'villainy-color-light': '#1D103D'
};

export const keyframes = {
    'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' }
    },
    'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' }
    },
    'caret-blink': {
        '0%,70%,100%': { opacity: '1' },
        '20%,50%': { opacity: '0' }
    }
};
