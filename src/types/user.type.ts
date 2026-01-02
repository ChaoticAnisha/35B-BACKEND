import z from 'zod';

export const UserSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(8),
    username: z.string().min(3).max(30).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.enum(['admin', 'user']).default('user'),
});

export type UserType = z.infer<typeof UserSchema>;