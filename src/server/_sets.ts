'use server';

import prisma from '@/lib/prisma';

import type { Set } from '@prisma/client';

export type SetData = Omit<Set, 'id'>;

export interface SetResult {
    Set?: Set | null;
    Sets?: Set[];
    Success: boolean;
    Message: string;
}

export const getSets = async (): Promise<SetResult> => {
    try {
        const sets = await prisma.set.findMany();
        return {
            Sets: sets,
            Success: true,
            Message: 'Sets fetched successfully.'
        };
    } catch (error) {
        if (error instanceof Error)
            return { Success: false, Message: error.message + '' };
        return { Success: false, Message: 'An unknown error occurred.' };
    }
};

export const getSetById = async (id: string): Promise<SetResult> => {
    try {
        const set = await prisma.set.findUnique({ where: { id: id } });
        return {
            Set: set,
            Success: true,
            Message: 'Set fetched successfully.'
        };
    } catch (error) {
        if (error instanceof Error)
            return { Success: false, Message: error.message + '' };
        return { Success: false, Message: 'An unknown error occurred.' };
    }
};

export const createSet = async (data: SetData): Promise<SetResult> => {
    try {
        const set = await prisma.set.create({ data });
        return {
            Set: set,
            Success: true,
            Message: 'Set created successfully.'
        };
    } catch (error) {
        if (error instanceof Error)
            return { Success: false, Message: error.message + '' };
        return { Success: false, Message: 'An unknown error occurred.' };
    }
};

export const updateSet = async (
    id: string,
    data: SetData
): Promise<SetResult> => {
    try {
        const set = await prisma.set.update({ where: { id: id }, data });
        return {
            Set: set,
            Success: true,
            Message: 'Set updated successfully.'
        };
    } catch (error) {
        if (error instanceof Error)
            return { Success: false, Message: error.message + '' };
        return { Success: false, Message: 'An unknown error occurred.' };
    }
};

export const deleteSet = async (id: string): Promise<SetResult> => {
    try {
        const set = await prisma.set.delete({ where: { id: id } });
        return {
            Set: set,
            Success: true,
            Message: 'Set deleted successfully.'
        };
    } catch (error) {
        if (error instanceof Error)
            return { Success: false, Message: error.message + '' };
        return { Success: false, Message: 'An unknown error occurred.' };
    }
};
