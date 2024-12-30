"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", auth_controller_1.signup);
//@ts-ignore
userRouter.post("/signin", auth_controller_1.signin);
userRouter.post("/logout", auth_controller_1.logout);
exports.default = userRouter;
