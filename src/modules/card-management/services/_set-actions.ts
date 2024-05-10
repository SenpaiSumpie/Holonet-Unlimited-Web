'use server';

import { createSet } from '@/server/_sets';
import { revalidatePath } from 'next/cache';

import type { SetData } from '@/server/_sets';
import type { CardManagementURL } from '@/types/path-urls';

export async function createSetAction(data: SetData, url: CardManagementURL) {
    await createSet(data);
    revalidatePath(
        `/tools/card-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
}
