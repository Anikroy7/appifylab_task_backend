import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ error: "email is required" }),
        password: z.string({ error: "Password is required" }),
    }),
});


export const AuthValidation = {
    loginValidationSchema,
};