import type { ReactElement } from 'react';

import type { NextPage } from 'next';
import CardManagementTabs from '@/modules/card-management/components/tabs';
import { CardDataProvider } from '@/modules/card-management/contexts/card-data-context';

import { getCards } from '@/server/_cards';
import { getSets } from '@/server/_sets';

interface CardsPageProps {
    children: ReactElement;
}

const CardManagementLayout: NextPage<CardsPageProps> = async ({ children }) => {
    const { cards = [] } = await getCards();
    const { Sets = [] } = await getSets();

    return (
        <CardDataProvider sets={Sets} cards={cards} loading={false}>
            <div className="container flex w-full flex-grow pb-8 pt-8 gap-4">
                <div className="basis-2/3">{children}</div>
                <div className="basis-1/3">
                    <CardManagementTabs />
                </div>
            </div>
        </CardDataProvider>
    );
};

export default CardManagementLayout;
