'use client';

import dynamic from 'next/dynamic';

const DynamicUnlimitedCard = dynamic(
    () => import('./unlimited-card').then((module) => module.UnlimitedCard),
    {
        ssr: false,
        loading: () => <p>Loading...</p>
    }
);

export default DynamicUnlimitedCard;
