import { z } from "zod";

export const createPostValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Content is required"),
        image: z.string().url().optional(),
        visibility: z.enum(['public', 'private']).default('public'),
    }),
});

export const updatePostValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1).optional(),
        image: z.string().url().optional(),
        visibility: z.enum(['public', 'private']).optional(),
    }),
});

export const addCommentValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Comment content is required"),
    }),
});

export const addReplyValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Reply content is required"),
    }),
});

export const PostValidation = {
    createPostValidationSchema,
    updatePostValidationSchema,
    addCommentValidationSchema,
    addReplyValidationSchema,
};
