const baseToastStyles =
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden';
const borderStyles = 'rounded-md border border-zinc-200 dark:border-zinc-800';
const paddingStyles = 'p-6 pr-8';
const animationStyles = 'transition-all shadow-lg';

export const toastStyles = `${baseToastStyles} ${borderStyles} ${paddingStyles} ${animationStyles}`;
