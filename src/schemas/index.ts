import * as z from 'zod';
import { UserRole, ArenaValues, RarityValues } from '@prisma/client';

export const CardsSchema = z.object({
    setId: z.string({
        required_error: 'Please select a set.'
    }),
    cardNumber: z.coerce.number(),
    name: z
        .string({
            required_error: 'Please enter a card name.'
        })
        .min(1, 'Please enter a card name.')
        .max(100, 'Please enter a card name.'),
    subtitle: z
        .string({
            required_error: 'Please enter a card subtitle.'
        })
        .min(1, 'Please enter a card subtitle.')
        .max(100, 'Please enter a card subtitle.'),
    type: z
        .string({
            required_error: 'Please enter a card type.'
        })
        .min(1, 'Please enter a card type.')
        .max(100, 'Please enter a card type.'),
    arena: z.enum([ArenaValues.SPACE, ArenaValues.GROUND]),
    cost: z.coerce.number().nonnegative('Please enter a positive number'),
    power: z.coerce.number().nonnegative('Please enter a positive number'),
    health: z.coerce.number().nonnegative('Please enter a positive number'),

    rarity: z.enum([
        RarityValues.COMMON,
        RarityValues.UNCOMMON,
        RarityValues.RARE,
        RarityValues.LEGENDARY
    ]),
    // frontText: z
    //     .string({
    //         required_error: 'Please enter a card front text.'
    //     })
    //     .min(1, 'Please enter a card front text.')
    //     .max(100, 'Please enter a card front text.'),
    // backText: z
    //     .string({
    //         required_error: 'Please enter a card back text.'
    //     })
    //     .min(1, 'Please enter a card back text.')
    //     .max(100, 'Please enter a card back text.'),
    // epicAction: z
    //     .string({
    //         required_error: 'Please enter a card epic action.'
    //     })
    //     .min(1, 'Please enter a card epic action.')
    //     .max(100, 'Please enter a card epic action.'),
    doubleSided: z.boolean({}),
    token: z.boolean({}),
    unique: z.boolean({}),
    // artist: z
    //     .string({
    //         required_error: 'Please enter a card artist.'
    //     })
    //     .min(1, 'Please enter a card artist.')
    //     .max(100, 'Please enter a card artist.'),
    frontImgUrl: z
        .string({
            required_error: 'Please enter a card front image URL.'
        })
        .min(1, 'Please enter a card front image URL.')
        .max(100, 'Please enter a card front image URL.')
    // backImgUrl: z
    //     .string({
    //         required_error: 'Please enter a card back image URL.'
    //     })
    //     .min(1, 'Please enter a card back image URL.')
    //     .max(100, 'Please enter a card back image URL.'),
    // hyperspaceUrl: z
    //     .string({
    //         required_error: 'Please enter a card front image URL.'
    //     })
    //     .min(1, 'Please enter a card front image URL.')
    //     .max(100, 'Please enter a card front image URL.'),
    // hyperspaceBackUrl: z
    //     .string({
    //         required_error: 'Please enter a card front image URL.'
    //     })
    //     .min(1, 'Please enter a card front image URL.')
    //     .max(100, 'Please enter a card front image URL.'),
    // leaderPortraitUrl: z
    //     .string({
    //         required_error: 'Please enter a card leader portrait URL.'
    //     })
    //     .min(1, 'Please enter a card leader portrait URL.')
    //     .max(100, 'Please enter a card leader portrait URL.'),
    // leaderBannerUrl: z
    //     .string({
    //         required_error: 'Please enter a card leader banner URL.'
    //     })
    //     .min(1, 'Please enter a card leader banner URL.')
    //     .max(100, 'Please enter a card leader banner URL.'),
    // playStyle: z
    //     .string({
    //         required_error: 'Please enter a card play style.'
    //     })
    //     .min(1, 'Please enter a card play style.')
    //     .max(100, 'Please enter a card play style.'),
    // difficulty: z
    //     .string({
    //         required_error: 'Please enter a card difficulty.'
    //     })
    //     .min(1, 'Please enter a card difficulty.')
    //     .max(100, 'Please enter a card difficulty.'),
    // skillCeiling: z
    //     .string({
    //         required_error: 'Please enter a card skill ceiling.'
    //     })
    //     .min(1, 'Please enter a card skill ceiling.')
    //     .max(100, 'Please enter a card skill ceiling.'),
    // description: z
    //     .string({
    //         required_error: 'Please enter a card description.'
    //     })
    //     .min(1, 'Please enter a card description.')
    //     .max(100, 'Please enter a card description.'),
    // howToPlay: z
    //     .string({
    //         required_error: 'Please enter a card how to play.'
    //     })
    //     .min(1, 'Please enter a card how to play.')
    //     .max(100, 'Please enter a card how to play.'),
    // usefulLinks: z
    //     .string({
    //         required_error: 'Please enter a card useful links.'
    //     })
    //     .min(1, 'Please enter a card useful links.')
    //     .max(100, 'Please enter a card useful links.'),
    // base: z.boolean({}),
    // banned: z.boolean({}),
    // createdAt: z.date({}),
    // updatedAt: z.date({})
});

export const SettingsSchema = z
    .object({
        name: z.optional(z.string()),
        isTwoFactorEnabled: z.optional(z.boolean()),
        role: z.enum([UserRole.ADMIN, UserRole.USER]),
        email: z.optional(z.string().email()),
        password: z.optional(z.string().min(6)),
        newPassword: z.optional(z.string().min(6))
    })
    .refine(
        (data) => {
            if (data.password && !data.newPassword) {
                return false;
            }

            return true;
        },
        {
            message: 'New password is required!',
            path: ['newPassword']
        }
    )
    .refine(
        (data) => {
            if (data.newPassword && !data.password) {
                return false;
            }

            return true;
        },
        {
            message: 'Password is required!',
            path: ['password']
        }
    );

export const NewPasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: 'Minimum of 6 characters required'
        }),
        confirmPassword: z.string().min(1, 'Password confirmation is required')
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match'
    });

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
});

export const OTPSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.'
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required')
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match'
    });
