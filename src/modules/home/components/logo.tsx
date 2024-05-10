'use-client';

import React from 'react';
import Image from 'next/image';

import { useTheme } from 'next-themes';

interface LogoProps {
    dimensions: number;
    altString: string;
}

export const Logo = ({ dimensions, altString }: LogoProps) => {
    const { theme } = useTheme();

    return (
        <Image
            src={'/idr.png'}
            width={dimensions}
            height={dimensions}
            alt={altString}
        ></Image>
    );
};
