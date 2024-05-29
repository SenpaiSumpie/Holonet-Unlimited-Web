'use server';

import prisma from '@/lib/prisma';
import type { Card } from '@prisma/client';

export type CardData = Partial<Omit<Card, 'id'>>;
export interface CardResult {
    Card?: Card | null;
    Success: boolean;
    Message: string;
}

export const getCards = async () => {
    try {
        const cards = await prisma.card.findMany();
        return { cards };
    } catch (error) {
        return { error };
    }
};

export const getCardById = async (id: string) => {
    try {
        const card = await prisma.card.findUnique({ where: { id: id } });
        return { card };
    } catch (error) {
        return { error };
    }
};

export const updateCard = async (
    id: string,
    data: CardData
): Promise<CardResult> => {
    try {
        const card = await prisma.card.update({ where: { id: id }, data });
        return {
            Card: card,
            Success: true,
            Message: 'Card successfully updated'
        };
    } catch (error) {
        if (error instanceof Error) {
            return { Success: false, Message: error.message + '' };
        }
        return {
            Success: false,
            Message: 'Error Unknown'
        };
    }
};

export const deleteCard = async (id: string): Promise<CardResult> => {
    try {
        const deletedCard = await prisma.card.delete({ where: { id: id } });
        return {
            Card: deletedCard,
            Success: true,
            Message: 'Card deleted successfully'
        };
    } catch (error) {
        if (error instanceof Error) {
            return { Success: false, Message: error.message + '' };
        }
        return { Success: false, Message: 'An unknown error occured' };
    }
};
