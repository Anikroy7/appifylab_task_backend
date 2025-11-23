import { Document, Types } from 'mongoose';

export interface ILike {
    userId: Types.ObjectId;
    createdAt?: Date;
}

export interface IReply {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    likes: ILike[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IComment {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    likes: ILike[];
    replies: IReply[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPost {
    userId: Types.ObjectId;
    content: string;
    image?: string;
    visibility: "public" | "private";
    likes: ILike[];
    comments: IComment[];
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}

export interface IPostDocument extends IPost, Document { }
