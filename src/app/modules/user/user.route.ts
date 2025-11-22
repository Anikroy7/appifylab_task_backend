import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { createUserValidationSchema } from "../user/user.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post(
    "/create-user",
    validateRequest(createUserValidationSchema),
    UserControllers.createUser
);


export const UserRoutes = router;