import { Document } from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt?: Date;
    updatedAt?: Date;
    role: "user" | "admin";
    status: 'active' | 'blocked';
    isDeleted: boolean;
    comparePassword?: (plainTextPassword: string) => Promise<boolean>;
}

export interface IUserDocument extends IUser, Document {
    comparePassword(plainTextPassword: string): Promise<boolean>;
}
