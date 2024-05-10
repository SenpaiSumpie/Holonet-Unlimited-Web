'use server';

import { updateUserRole } from '@/server/_user';
import { revalidatePath } from 'next/cache';

import type { UserData } from '@/server/_user';
import type { CardManagementURL } from '@/types/path-urls';

export async function updateUserRoleAction(
    id: string,
    data: UserData,
    url: CardManagementURL
) {
    const response = await updateUserRole(id, data);
    revalidatePath(
        `/tools/user-management/${url.selectedPage}?state=${url.state}&id=${url.id}`
    );
    return response;
}
