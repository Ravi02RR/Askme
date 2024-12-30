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
exports.logout = exports.signin = exports.signup = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const jsonWebtoken_1 = require("../utils/jsonWebtoken");
const user_model_1 = require("../model/user.model");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // console.log(username);
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required." });
        }
        const foundUser = yield user_model_1.userModel.findOne({ username });
        if (foundUser) {
            return res.status(403).json({
                message: "User already exists.",
            });
        }
        const hashedPassword = yield (0, bcrypt_1.createHash)(password);
        const newUser = yield user_model_1.userModel.create({
            username,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User created successfully.",
            user: { id: newUser._id, username: newUser.username },
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || "An unexpected error occurred.",
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required." });
        }
        const foundUser = yield user_model_1.userModel.findOne({ username });
        if (!foundUser) {
            return res.status(403).json({ message: "User does not exist." });
        }
        const isCorrectPass = yield (0, bcrypt_1.comparePassword)(password, foundUser.password);
        if (!isCorrectPass) {
            return res.status(403).json({ message: "Incorrect password." });
        }
        const token = (0, jsonWebtoken_1.createToken)({ username: foundUser.username });
        return res
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            secure: false,
            //@ts-ignore
            sameSite: "Lax",
        })
            .json({
            message: "Signin successful.",
            user: { id: foundUser._id, username: foundUser.username },
            token,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || "An unexpected error occurred.",
        });
    }
});
exports.signin = signin;
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully." });
};
exports.logout = logout;
