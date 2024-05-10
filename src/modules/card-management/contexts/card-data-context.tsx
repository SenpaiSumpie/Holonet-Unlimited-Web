'use client';

import React, { createContext, useContext } from 'react';

import type { Set, Card } from '@prisma/client';

interface CardDataProviderProps {
    children: React.ReactNode;
    sets: Set[];
    cards: Card[];
    loading: boolean;
}

const CardDataContext = createContext<{
    sets: Set[];
    cards: Card[];
    loading: boolean;
}>({
    sets: [],
    cards: [],
    loading: true
});

export const useCardData = () => useContext(CardDataContext);

export const CardDataProvider: React.FC<CardDataProviderProps> = ({
    children,
    sets,
    cards,
    loading
}) => {
    return (
        <CardDataContext.Provider value={{ sets, cards, loading }}>
            {children}
        </CardDataContext.Provider>
    );
};
