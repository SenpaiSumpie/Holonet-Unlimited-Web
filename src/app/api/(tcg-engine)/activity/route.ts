export async function POST(req: Request) {}

export async function GET(req: Request) {}

import { GetAllActivities } from './_server';
import {
    GetActivitiesByFilter,
    LogActivity,
    LogActivitySchema
} from './_server';
import { z } from 'zod';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const activities = await GetAllActivities();
            return res.status(200).json(activities);
        } else if (req.method === 'POST') {
            // Validate request body
            const validatedData = z
                .object({
                    type: z.string(),
                    username: z.string().optional(),
                    data: z.object().optional()
                })
                .parse(req.body);

            const { type, username, data } = validatedData;

            // Log activity
            await LogActivity(type, username, data);

            return res
                .status(200)
                .json({ message: 'Activity logged successfully' });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
