import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { userAuthMiddleware } from "../middleware/userAuthmiddleware";

//types
import { DatabaseHealth, HealthStatus } from "../utils/interface";

const app = express();

// Create a limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const checkDatabaseConnection = async (): Promise<DatabaseHealth> => {
  try {
    const state = mongoose.connection.readyState;
    const states: { [key: number]: string } = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    return {
      status: states[state] || "unknown",
      //@ts-ignore
      ping: await mongoose.connection.db.admin().ping(),
      //@ts-ignore
      statistics: mongoose.connection.db
        ? await mongoose.connection.db.stats()
        : undefined,
    };
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

const checkServices = async (): Promise<HealthStatus> => {
  const health: HealthStatus = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    status: "healthy",
    services: {
      server: "up",
      database: await checkDatabaseConnection(),
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
  } catch (error) {
    health.status = "unhealthy";
    return health;
  }
};



app.get("/api/v1/health", async (req: Request, res: Response) => {
  try {
    const healthStatus = await checkServices();
    const statusCode = healthStatus.status === "healthy" ? 200 : 503;
    res.status(statusCode).json(healthStatus);
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
});

app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "../route/user.route";
import aiRoute from "../route/ai.route";

app.use("/api/v1/auth", authLimiter, userRouter);
//@ts-ignore
app.use("/api/v1", userAuthMiddleware, aiRoute);

import apiDoc from "../doc/apidoc";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDoc));

export default app;
