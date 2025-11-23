import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import httpStatus from "http-status";

const createPost = catchAsync(async (req, res) => {
    const userId = req.user!.userId;
    const result = await PostServices.createPostIntoDB(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Post created successfully",
        data: result,
    });
});

const getAllPosts = catchAsync(async (req, res) => {
    const userId = req.user?.userId;
    const result = await PostServices.getAllPostsFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Posts retrieved successfully",
        data: result,
    });
});

const getPostById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const result = await PostServices.getPostByIdFromDB(id, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post retrieved successfully",
        data: result,
    });
});

const updatePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const result = await PostServices.updatePostInDB(id, userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post updated successfully",
        data: result,
    });
});

const deletePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    await PostServices.deletePostFromDB(id, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post deleted successfully",
        data: null,
    });
});

const togglePostLike = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const result = await PostServices.togglePostLike(id, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post like toggled successfully",
        data: result,
    });
});

const getPostLikes = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PostServices.getPostLikes(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post likes retrieved successfully",
        data: result,
    });
});

const addComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const { content } = req.body;
    const result = await PostServices.addCommentToPost(id, userId, content);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Comment added successfully",
        data: result,
    });
});

const toggleCommentLike = catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    const userId = req.user!.userId;
    const result = await PostServices.toggleCommentLike(id, commentId, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment like toggled successfully",
        data: result,
    });
});

const getCommentLikes = catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    const result = await PostServices.getCommentLikes(id, commentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment likes retrieved successfully",
        data: result,
    });
});

const addReply = catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    const userId = req.user!.userId;
    const { content } = req.body;
    const result = await PostServices.addReplyToComment(id, commentId, userId, content);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Reply added successfully",
        data: result,
    });
});

const toggleReplyLike = catchAsync(async (req, res) => {
    const { id, commentId, replyId } = req.params;
    const userId = req.user!.userId;
    const result = await PostServices.toggleReplyLike(id, commentId, replyId, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reply like toggled successfully",
        data: result,
    });
});

const getReplyLikes = catchAsync(async (req, res) => {
    const { id, commentId, replyId } = req.params;
    const result = await PostServices.getReplyLikes(id, commentId, replyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reply likes retrieved successfully",
        data: result,
    });
});

export const PostControllers = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    togglePostLike,
    getPostLikes,
    addComment,
    toggleCommentLike,
    getCommentLikes,
    addReply,
    toggleReplyLike,
    getReplyLikes,
};
