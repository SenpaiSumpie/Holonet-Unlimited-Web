'use server';

import prisma from '@/lib/prisma';

import type { User } from '@prisma/client';

export type UserData = Omit<User, 'id'>;

export interface UserResult {
    User?: User | null;
    Users?: User[];
    Success: boolean;
    Message: string;
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        return user;
    } catch (error) {
        return error;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        return user;
    } catch (error) {
        return error;
    }
};

export const getUserByUsername = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username }
        });
        return user;
    } catch (error) {
        return error;
    }
};

export const getUsers = async (): Promise<UserResult> => {
    try {
        const users = await prisma.user.findMany();
        return {
            Users: users,
            Success: true,
            Message: 'Sets fetched successfully.'
        };
    } catch (error) {
        if (error instanceof Error)
            return { Success: false, Message: error.message + '' };
        return { Success: false, Message: 'An unknown error occurred.' };
    }
};

export const updateUserRole = async (id: string, data: UserData) => {
    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: {
                role: data.role
            }
        });
        return {
            User: user,
            Success: true,
            Message: 'User updated successfully.'
        };
    } catch (error) {
        if (error instanceof Error)
            return { Success: false, Message: error.message + '' };
        return { Success: false, Message: 'An unknown error occurred.' };
    }
};
