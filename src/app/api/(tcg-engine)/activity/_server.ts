import { object, string, optional, union } from 'zod';

import prisma from '@/lib/prisma';

const ActivityType = union([string(), null]);
const UsernameType = union([string(), null]);
const DataType = union([object(), null]);

const LogActivityInput = object({
    type: string(),
    username: optional(string()),
    data: optional(object())
});

export async function LogActivity(type, username, data) {
    try {
        await prisma.activity.create({
            data: {
                type,
                username,
                timestamp: new Date(),
                data
            }
        });
        return true;
    } catch (error) {
        console.error('Error logging activity:', error);
        return false;
    }
}

export async function GetAllActivities() {
    try {
        return await prisma.activity.findMany();
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
}

export async function GetActivitiesByFilter(filter) {
    try {
        return await prisma.activity.findMany({
            where: filter
        });
    } catch (error) {
        console.error('Error fetching activities by filter:', error);
        return [];
    }
}

export const LogActivitySchema = LogActivityInput;
export const ActivityTypes = ActivityType;
export const UsernameTypes = UsernameType;
export const DataTypes = DataType;
