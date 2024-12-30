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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const mongoose_1 = __importDefault(require("mongoose"));
const userAuthmiddleware_1 = require("../middleware/userAuthmiddleware");
const app = (0, express_1.default)();
//@ts-ignore
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://askme-8puo.onrender.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
// Create a limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});
const checkDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const state = mongoose_1.default.connection.readyState;
        const states = {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting",
        };
        return {
            status: states[state] || "unknown",
            //@ts-ignore
            ping: yield mongoose_1.default.connection.db.admin().ping(),
            //@ts-ignore
            statistics: mongoose_1.default.connection.db
                ? yield mongoose_1.default.connection.db.stats()
                : undefined,
        };
    }
    catch (error) {
        return {
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
});
const checkServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const health = {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage(),
        status: "healthy",
        services: {
            server: "up",
            database: yield checkDatabaseConnection(),
            api: "up",
        },
    };
    try {
        if (health.services.database.status !== "connected") {
            health.status = "unhealthy";
        }
        if (health.services.database.statistics) {
            health.services.database.metrics = {
                collections: health.services.database.statistics.collections,
                avgObjSize: health.services.database.statistics.avgObjSize,
                dataSize: health.services.database.statistics.dataSize,
                indexes: health.services.database.statistics.indexes,
            };
        }
        return health;
    }
    catch (error) {
        health.status = "unhealthy";
        return health;
    }
});
app.get("/api/v1/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const healthStatus = yield checkServices();
        const statusCode = healthStatus.status === "healthy" ? 200 : 503;
        res.status(statusCode).json(healthStatus);
    }
    catch (error) {
        res.status(503).json({
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
}));
const apidoc_1 = __importDefault(require("../doc/apidoc"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(apidoc_1.default));
const path_1 = __importDefault(require("path"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../dist/dist")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../dist/dist/index.html"));
});
app.use(limiter);
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "Too many login attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use((0, cors_1.default)({
    origin: [
        "htpp://localhost:5173",
        "http://localhost:3000",
        "https://askme-8puo.onrender.com/",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const user_route_1 = __importDefault(require("../route/user.route"));
const ai_route_1 = __importDefault(require("../route/ai.route"));
app.use("/api/v1/auth", authLimiter, user_route_1.default);
//@ts-ignore
app.use("/api/v1", userAuthmiddleware_1.userAuthMiddleware, ai_route_1.default);
exports.default = app;
