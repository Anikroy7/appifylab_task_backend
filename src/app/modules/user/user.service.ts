import { IUser } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
    const user = new UserModel(payload);
    return await user.save();
};

export const UserServices = {
    createUserIntoDB,
};