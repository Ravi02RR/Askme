"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jsonWebtoken_1 = require("../utils/jsonWebtoken");
const user_model_1 = require("../model/user.model");
const userAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(403).json({
                message: "User not authenticated",
            });
        }
        const decodedData = (0, jsonWebtoken_1.verifyToken)(token);
        if (!decodedData) {
            return res.status(403).json({
                message: "Invalid token",
            });
        }
        const foundUser = yield user_model_1.userModel.findOne({
            //@ts-ignore
            username: decodedData.username,
        });
        if (!foundUser) {
            return res.status(403).json({
                message: "User not authenticated",
            });
        }
        //@ts-ignore
        req.userID = foundUser._id;
        next();
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});
exports.userAuthMiddleware = userAuthMiddleware;
