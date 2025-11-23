import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import MongooseDelete, { SoftDeleteModel } from 'mongoose-delete';
import { IPostDocument } from './post.interface';

const LikeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const ReplySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        likes: [LikeSchema],
    },
    {
        timestamps: true,
    }
);

const CommentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        likes: [LikeSchema],
        replies: [ReplySchema],
    },
    {
        timestamps: true,
    }
);

const PostSchema = new mongoose.Schema<IPostDocument>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        image: { type: String },
        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },
        likes: [LikeSchema],
        comments: [CommentSchema],
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

PostSchema.plugin(mongoosePaginate);
PostSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: true });

PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ visibility: 1, createdAt: -1 });

const PostModel = mongoose.model<IPostDocument, mongoose.PaginateModel<IPostDocument> & SoftDeleteModel<IPostDocument>>(
    'Post',
    PostSchema
);

export default PostModel;
