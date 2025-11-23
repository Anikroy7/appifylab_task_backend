import AppError from "../../errors/AppError";
import UserModel from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
    //if the user is exist
    const user = await UserModel.findOne({ email: payload.email }).select(
        "email password role"
    );

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid crediantial!");
    }
    //if the password is correct

    if (!(await user.comparePassword(payload?.password)))
        throw new AppError(httpStatus.FORBIDDEN, "Invalid crediantial!");

    //create token and sent to the client

    const newUser = await UserModel.findOne({ email: payload.email });
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.access_token_secret as string,
        config.access_token_life as string
    );

    return {
        accessToken,
        newUser,
    };
};

export const AuthServices = {
    loginUser
};