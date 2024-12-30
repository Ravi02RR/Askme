"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (data) => {
    const secret = process.env.JWT;
    if (!secret) {
        throw new Error("JWT secret is not defined in environment variables.");
    }
    const token = jsonwebtoken_1.default.sign(data, secret);
    return token;
};
exports.createToken = createToken;
const verifyToken = (token) => {
    const secret = process.env.JWT;
    if (!secret) {
        throw new Error("JWT secret is not defined in environment variables.");
    }
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, secret);
        return decodedData;
    }
    catch (error) {
        throw new Error("Invalid or expired token.");
    }
};
exports.verifyToken = verifyToken;
