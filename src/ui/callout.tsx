import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';

import { cn } from '@/lib/utils';

const calloutVariants = cva('relative rounded-xl bg-layer-2 p-4 pr-16', {
    variants: {
        variant: {
            default: 'bg-gray-100 text-gray-700 ',
            info: 'bg-blue-100 text-blue-700',
            warning: 'bg-amber-100 text-amber-700',
            error: 'bg-red-100 text-red-700',
            success: 'bg-green-100 text-green-700',
            purple: 'bg-purple-100 text-purple-700'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

export interface CalloutProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof calloutVariants> {}

const Callout = ({ className, variant, ...props }: CalloutProps) => {
    return (
        <div
            className={cn(calloutVariants({ variant }), className)}
            {...props}
        />
    );
};

const CalloutIcon = ({ variant }: { variant: string }) => {
    switch (variant) {
        case 'info':
            return <Info className="h-6 w-6 flex-shrink-0" />;
        case 'warning':
            return <AlertTriangle className="h-6 w-6 flex-shrink-0" />;
        case 'error':
            return <AlertTriangle className="h-6 w-6 flex-shrink-0" />;
        case 'success':
            return <CheckCircle2 className="h-6 w-6 flex-shrink-0" />;
        default:
            return <Info className="h-6 w-6 flex-shrink-0" />;
    }
};

const CalloutTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('mt-0.5 text-sm font-semibold', className)}
        {...props}
    />
));

const CalloutDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('mt-1 text-xs font-medium text-text', className)}
        {...props}
    />
));

export {
    Callout,
    CalloutIcon,
    CalloutTitle,
    CalloutDescription,
    calloutVariants
};
