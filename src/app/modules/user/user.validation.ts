import { z } from "zod";

export const createUserValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        firstName: z.string(),
        email: z.string().email(),
        lastName: z.string(),
        role: z.enum(['user', 'admin']).default('user'),
        status: z.enum(['blocked', 'active']).default('active'),
        isDeleted: z.boolean().default(false)
    }),
});


export const UserValidation = {
    createUserValidationSchema,
};