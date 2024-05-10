'use server';

import {
    type CardData,
    createCard,
    deleteCard,
    updateCard
} from '@/server/_cards';
import { CardManagementURL } from '@/types/path-urls';
import { Card } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createCardAction(data: CardData, url: CardManagementURL) {
    const response = await createCard(data);
    revalidatePath(
        `/tools/card-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
    return response;
}

export async function deleteCardAction(id: string, url: CardManagementURL) {
    const response = await deleteCard(id);
    revalidatePath(
        `/tools/card-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
    return response;
}
export async function updateCardAction(
    id: string,
    data: CardData,
    url: CardManagementURL
) {
    const response = await updateCard(id, data);
    revalidatePath(
        `/tools/card-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
    return response;
}
