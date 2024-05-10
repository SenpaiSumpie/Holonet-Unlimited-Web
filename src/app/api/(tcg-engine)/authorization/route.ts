import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { randomBytes, createHmac } from 'crypto';

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;
const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION;

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const RefreshSchema = z.object({
    refresh_token: z.string()
});

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            if (req.url === '/auth') {
                // Login route
                const { email, password } = LoginSchema.parse(req.body);

                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if (!user || !validatePassword(user, password)) {
                    return res
                        .status(404)
                        .json({ error: 'Invalid email or password' });
                }

                const refreshKey = randomBytes(16).toString('base64');
                const refreshId = user.id + jwtSecret;
                const refreshHash = createHmac('sha512', refreshKey)
                    .update(refreshId)
                    .digest('base64');

                const accessToken = jwt.sign(
                    {
                        userId: user.id,
                        email: user.email,
                        permission_level: user.permission_level,
                        validation_level: user.validation_level
                    },
                    jwtSecret,
                    { expiresIn: jwtExpiration }
                );

                const update = {
                    refresh_key: refreshKey,
                    proof_key: '',
                    password_recovery_key: '',
                    last_login_time: new Date(),
                    last_online_time: new Date()
                };

                await prisma.user.update({
                    where: { id: user.id },
                    data: update
                });

                const responseData = {
                    id: user.id,
                    email: user.email,
                    access_token: accessToken,
                    refresh_token: refreshHash,
                    permission_level: user.permission_level,
                    validation_level: user.validation_level,
                    duration: jwtExpiration,
                    server_time: new Date(),
                    version: process.env.VERSION
                };

                return res.status(201).json(responseData);
            } else if (req.url === '/auth/refresh') {
                // Refresh token route
                const { refresh_token } = RefreshSchema.parse(req.body);

                // Implement refresh token logic here
                // ...

                return res.status(200).json({ message: 'Refresh token route' });
            }
        } else if (req.method === 'GET') {
            // Keep online route
            // Implement keep online logic here
            // ...

            return res.status(200).json({ message: 'Keep online route' });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function validatePassword(user, password) {
    const [salt, hash] = user.password.split('$');
    const hashedPassword = createHmac('sha512', salt)
        .update(password)
        .digest('base64');
    return hashedPassword === hash;
}
