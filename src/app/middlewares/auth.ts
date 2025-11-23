import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { Types } from "mongoose";

interface JwtPayload {
    userId: Types.ObjectId;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        try {
            const decoded = jwt.verify(
                token,
                config.access_token_secret as string
            ) as JwtPayload;

            req.user = decoded;

            if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                throw new AppError(
                    httpStatus.FORBIDDEN,
                    "You don't have permission to access this resource"
                );
            }

            next();
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
        }
    });
};

export default auth;
