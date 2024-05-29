import type { NextRequest, NextResponse } from 'next/server';

type RequestLog = { timestamp: number }[];

const rateLimit = (limit: number, windowMs: number) => {
    const requests = new Map<string, RequestLog>();

    return (
        req: NextRequest,
        res: typeof NextResponse,
        next: (err?: any) => void //eslint-disable-line
    ) => {
        const now = Date.now();
        const windowStart = now - windowMs;

        const ip = req.headers.get('x-forwarded-for') ?? req.ip;
        if (!ip) return next();

        if (!requests.has(ip)) {
            requests.set(ip, []);
        }

        const requestLog = requests
            .get(ip)!
            .filter((log) => log.timestamp > windowStart);

        if (requestLog.length >= limit) {
            return res.json(
                {
                    message:
                        'Too many requests from this IP, please try again later'
                },
                { status: 429 }
            );
        } else {
            requestLog.push({ timestamp: now });
            requests.set(ip, requestLog);
            next();
        }
    };
};

export default rateLimit;
