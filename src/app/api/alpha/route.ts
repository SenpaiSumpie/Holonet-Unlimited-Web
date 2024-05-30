import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit(5, 15 * 60 * 1000); // 5 requests per 15 minutes

export async function POST(req: NextRequest) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { email } = await req.json();

        const response = await new Promise<void>((resolve, reject) => {
            //eslint-disable-next-line
            limiter(req, NextResponse, (err?: any) => {
                if (err) return reject(err);
                resolve();
            });
        });

        //eslint-disable-next-line
        const existingUser = await prisma.alphaSignUps.findUnique({
            //eslint-disable-next-line
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'This email has already been submitted.' },
                { status: 400 }
            );
        }

        //eslint-disable-next-line
        await prisma.alphaSignUps.create({
            //eslint-disable-next-line
            data: { email }
        });

        return NextResponse.json(
            { message: 'Signed up successfully' },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'An error occurred' },
            { status: 500 }
        );
    }
}
