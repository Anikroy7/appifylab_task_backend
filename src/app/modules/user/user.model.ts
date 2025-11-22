import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate-v2';
import MongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

import { IUserDocument } from './user.interface';

const UserSchema = new mongoose.Schema<IUserDocument>(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, select: false },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: {
            type: String,
            enum: ["user", "admin"],
        },
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: 'active'
        },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as Error);
    }
});

// Compare password method
UserSchema.methods.comparePassword = async function (plainTextPassword: string): Promise<boolean> {
    if (!this.password) return false;
    try {
        return await bcrypt.compare(plainTextPassword, this.password);
    } catch {
        return false;
    }
};

// Plugins
UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: true });

// Index
UserSchema.index({ email: 1 }, { unique: true });

// Model
const UserModel = mongoose.model<IUserDocument, mongoose.PaginateModel<IUserDocument> & SoftDeleteModel<IUserDocument>>(
    'User',
    UserSchema
);

export default UserModel;