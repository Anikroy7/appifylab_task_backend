import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import PostModel from "./post.model";
import { IPost } from "./post.interface";
import httpStatus from "http-status";

const createPostIntoDB = async (userId: Types.ObjectId, payload: Partial<IPost>) => {
    const post = new PostModel({
        ...payload,
        userId,
    });
    const result = await post.save();
    return await PostModel.findById(result._id).populate('userId', 'firstName lastName email');
};

const getAllPostsFromDB = async (userId?: Types.ObjectId) => {

    const query: any = userId
        ? { $or: [{ userId, visibility: 'private' }, { visibility: 'public' }] }
        : { visibility: 'public' };

    const posts = await PostModel.find(query)
        .populate('userId', 'firstName lastName email')
        .populate('comments.userId', 'firstName lastName email')
        .populate('comments.replies.userId', 'firstName lastName email')
        .populate('likes.userId', 'firstName lastName email')
        .populate('comments.likes.userId', 'firstName lastName email')
        .populate('comments.replies.likes.userId', 'firstName lastName email')
        .sort({ createdAt: -1 });

    return posts;
};

const getPostByIdFromDB = async (postId: string, requestUserId?: Types.ObjectId) => {
    const post = await PostModel.findById(postId)
        .populate('userId', 'firstName lastName email')
        .populate('comments.userId', 'firstName lastName email')
        .populate('comments.replies.userId', 'firstName lastName email')
        .populate('likes.userId', 'firstName lastName email')
        .populate('comments.likes.userId', 'firstName lastName email')
        .populate('comments.replies.likes.userId', 'firstName lastName email');

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    if (post.visibility === 'private' && (!requestUserId || post.userId._id.toString() !== requestUserId.toString())) {
        throw new AppError(httpStatus.FORBIDDEN, "You don't have permission to view this post");
    }

    return post;
};

const updatePostInDB = async (postId: string, userId: Types.ObjectId, payload: Partial<IPost>) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    if (post.userId.toString() !== userId.toString()) {
        throw new AppError(httpStatus.FORBIDDEN, "You can only update your own posts");
    }

    const result = await PostModel.findByIdAndUpdate(
        postId,
        { $set: payload },
        { new: true, runValidators: true }
    ).populate('userId', 'firstName lastName email');

    return result;
};

const deletePostFromDB = async (postId: string, userId: Types.ObjectId) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    if (post.userId.toString() !== userId.toString()) {
        throw new AppError(httpStatus.FORBIDDEN, "You can only delete your own posts");
    }

    await PostModel.findByIdAndDelete(postId);
    return null;
};


const togglePostLike = async (postId: string, userId: Types.ObjectId) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const likeIndex = post.likes.findIndex(like => like.userId.toString() === userId.toString());

    if (likeIndex > -1) {
        post.likes.splice(likeIndex, 1);
    } else {
        post.likes.push({ userId });
    }

    await post.save();
    return await PostModel.findById(postId)
        .populate('userId', 'firstName lastName email')
        .populate('likes.userId', 'firstName lastName email');
};

const getPostLikes = async (postId: string) => {
    const post = await PostModel.findById(postId).populate('likes.userId', 'firstName lastName email');

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    return post.likes;
};

const addCommentToPost = async (postId: string, userId: Types.ObjectId, content: string) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    post.comments.push({
        userId,
        content,
        likes: [],
        replies: [],
    });

    await post.save();
    return await PostModel.findById(postId)
        .populate('userId', 'firstName lastName email')
        .populate('comments.userId', 'firstName lastName email');
};

const toggleCommentLike = async (postId: string, commentId: string, userId: Types.ObjectId) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const comment = (post.comments as any).id(commentId);

    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    const likeIndex = comment.likes.findIndex((like: any) => like.userId.toString() === userId.toString());

    if (likeIndex > -1) {

        comment.likes.splice(likeIndex, 1);
    } else {
        comment.likes.push({ userId });
    }

    await post.save();
    return await PostModel.findById(postId)
        .populate('userId', 'firstName lastName email')
        .populate('comments.userId', 'firstName lastName email')
        .populate('comments.likes.userId', 'firstName lastName email');
};

const getCommentLikes = async (postId: string, commentId: string) => {
    const post = await PostModel.findById(postId).populate('comments.likes.userId', 'firstName lastName email');

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const comment = (post.comments as any).id(commentId);

    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    return comment.likes;
};

const addReplyToComment = async (postId: string, commentId: string, userId: Types.ObjectId, content: string) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const comment = (post.comments as any).id(commentId);

    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    comment.replies.push({
        userId,
        content,
        likes: [],
    });

    await post.save();
    return await PostModel.findById(postId)
        .populate('userId', 'firstName lastName email')
        .populate('comments.userId', 'firstName lastName email')
        .populate('comments.replies.userId', 'firstName lastName email');
};

const toggleReplyLike = async (postId: string, commentId: string, replyId: string, userId: Types.ObjectId) => {
    const post = await PostModel.findById(postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const comment = (post.comments as any).id(commentId);

    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    const reply = (comment.replies as any).id(replyId);

    if (!reply) {
        throw new AppError(httpStatus.NOT_FOUND, "Reply not found");
    }

    const likeIndex = reply.likes.findIndex((like: any) => like.userId.toString() === userId.toString());

    if (likeIndex > -1) {
        reply.likes.splice(likeIndex, 1);
    } else {
        reply.likes.push({ userId });
    }

    await post.save();
    return await PostModel.findById(postId)
        .populate('userId', 'firstName lastName email')
        .populate('comments.userId', 'firstName lastName email')
        .populate('comments.replies.userId', 'firstName lastName email')
        .populate('comments.replies.likes.userId', 'firstName lastName email');
};

const getReplyLikes = async (postId: string, commentId: string, replyId: string) => {
    const post = await PostModel.findById(postId).populate('comments.replies.likes.userId', 'firstName lastName email');

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const comment = (post.comments as any).id(commentId);

    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    const reply = (comment.replies as any).id(replyId);

    if (!reply) {
        throw new AppError(httpStatus.NOT_FOUND, "Reply not found");
    }

    return reply.likes;
};

export const PostServices = {
    createPostIntoDB,
    getAllPostsFromDB,
    getPostByIdFromDB,
    updatePostInDB,
    deletePostFromDB,
    togglePostLike,
    getPostLikes,
    addCommentToPost,
    toggleCommentLike,
    getCommentLikes,
    addReplyToComment,
    toggleReplyLike,
    getReplyLikes,
};
