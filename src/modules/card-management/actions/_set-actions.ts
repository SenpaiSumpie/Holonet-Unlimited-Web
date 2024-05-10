'use server';

import { createSet, updateSet, deleteSet } from '@/server/_sets';
import { revalidatePath } from 'next/cache';

import type { SetData } from '@/server/_sets';
import type { CardManagementURL } from '@/types/path-urls';

export async function createSetAction(data: SetData, url: CardManagementURL) {
    const response = await createSet(data);
    revalidatePath(
        `/tools/card-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
    return response;
}

export async function updateSetAction(
    id: string,
    data: SetData,
    url: CardManagementURL
) {
    const response = await updateSet(id, data);
    revalidatePath(
        `/tools/card-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
    return response;
}

export async function deleteSetAction(id: string, url: CardManagementURL) {
    const response = await deleteSet(id);
    revalidatePath(
        `/tools/card-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
    return response;
}
