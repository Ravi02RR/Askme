import { Router } from "express";
import { signup, signin } from "../controller/auth.controller";

const userRouter = Router();

userRouter.post("/signup", signup);
//@ts-ignore
userRouter.post("/signin", signin);

export default userRouter;
