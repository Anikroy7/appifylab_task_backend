import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
    jwtPayload: { userId: Types.ObjectId; role: string; email: string },
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn: expiresIn,
    } as jwt.SignOptions);
};