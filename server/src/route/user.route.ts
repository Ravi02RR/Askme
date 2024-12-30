import { Router } from "express";
import { signup, signin, logout } from "../controller/auth.controller";

const userRouter = Router();

userRouter.post("/signup", signup);
//@ts-ignore
userRouter.post("/signin", signin);
userRouter.post("/logout", logout);

export default userRouter;
