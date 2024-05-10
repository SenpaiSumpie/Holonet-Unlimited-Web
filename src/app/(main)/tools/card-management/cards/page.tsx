import React from 'react';

import { CardsForms2 } from '@/modules/card-management/components/card-form';

const CardsPage = ({ searchParams }: { searchParams?: { id?: string } }) => {
    const id = searchParams?.id;

    // Get sets, get images
    return (
        <>
            <CardsForms2 cardId={id ?? ''} />
        </>
    );
};

export default CardsPage;
