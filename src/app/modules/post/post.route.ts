import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidation } from "./post.validation";
import { PostControllers } from "./post.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create post
router.post(
    "/",
    auth("user", "admin"),
    validateRequest(PostValidation.createPostValidationSchema),
    PostControllers.createPost
);

// Get all posts
router.get(
    "/",
    auth("user", "admin"),
    PostControllers.getAllPosts
);

// Get single post
router.get(
    "/:id",
    PostControllers.getPostById
);

// Update post
router.patch(
    "/:id",
    auth("user", "admin"),
    validateRequest(PostValidation.updatePostValidationSchema),
    PostControllers.updatePost
);

// Delete post
router.delete(
    "/:id",
    auth("user", "admin"),
    PostControllers.deletePost
);

// Toggle post like
router.post(
    "/:id/like",
    auth("user", "admin"),
    PostControllers.togglePostLike
);

// Get post likes
router.get(
    "/:id/likes",
    PostControllers.getPostLikes
);

// Add comment
router.post(
    "/:id/comments",
    auth("user", "admin"),
    validateRequest(PostValidation.addCommentValidationSchema),
    PostControllers.addComment
);

// Toggle comment like
router.post(
    "/:id/comments/:commentId/like",
    auth("user", "admin"),
    PostControllers.toggleCommentLike
);

// Get comment likes
router.get(
    "/:id/comments/:commentId/likes",
    PostControllers.getCommentLikes
);

// Add reply to comment
router.post(
    "/:id/comments/:commentId/replies",
    auth("user", "admin"),
    validateRequest(PostValidation.addReplyValidationSchema),
    PostControllers.addReply
);

// Toggle reply like
router.post(
    "/:id/comments/:commentId/replies/:replyId/like",
    auth("user", "admin"),
    PostControllers.toggleReplyLike
);

// Get reply likes
router.get(
    "/:id/comments/:commentId/replies/:replyId/likes",
    PostControllers.getReplyLikes
);

export const PostRoutes = router;
