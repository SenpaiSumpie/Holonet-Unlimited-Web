import { NextResponse } from 'next/server';
import type { User } from '@prisma/client';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

// Define a schema for input validation
const userSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .max(15, 'Username is too long'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have more than 8 characters')
});

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as User;
        const { email, username, password } = userSchema.parse(body);

        // check if email already exists
        const emailExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (emailExists) {
            return NextResponse.json(
                { user: null, message: 'Email already exists' },
                { status: 409 }
            );
        }

        // Check if the username is taken
        const usernameExists = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (usernameExists) {
            return NextResponse.json(
                { user: null, message: 'Username is taken' },
                { status: 409 }
            );
        }

        // eslint-disable-next-line
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword //eslint-disable-line
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: userPassword, ...userInfo } = newUser;

        return NextResponse.json(
            { user: userInfo, message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { user: null, message: `Error: ${error.message}` },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { user: null, message: 'An error occurred' },
                { status: 500 }
            );
        }
    }
}
