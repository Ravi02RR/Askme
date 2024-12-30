"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiDoc = {
    swagger: "2.0",
    info: {
        title: "Assignment - Full Stack Developer",
        version: "1.0.0",
        description: "Neura Dynamics - Assignment Submission",
    },
    basePath: "/api/v1",
    tags: [
        {
            name: "Authentication",
            description: "User authentication endpoints",
        },
        {
            name: "AI Chat",
            description: "AI chat and history endpoints",
        },
        {
            name: "System",
            description: "System health and monitoring endpoints",
        },
    ],
    paths: {
        "/auth/signup": {
            post: {
                tags: ["Authentication"],
                summary: "User Signup",
                description: "Create a new user account",
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                username: {
                                    type: "string",
                                    description: "Unique username",
                                    example: "ravi123",
                                },
                                password: {
                                    type: "string",
                                    description: "User password",
                                    example: "Secure@1234",
                                },
                            },
                            required: ["username", "password"],
                        },
                    },
                ],
                responses: {
                    201: {
                        description: "User created successfully",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "User created successfully.",
                                },
                                user: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                            example: "64a87b3e9d9f8c001b5f1234",
                                        },
                                        username: {
                                            type: "string",
                                            example: "ravi123",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad Request",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Username and password are required.",
                                },
                            },
                        },
                    },
                    403: {
                        description: "User already exists",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "User already exists.",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal Server Error",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "An unexpected error occurred.",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/signin": {
            post: {
                tags: ["Authentication"],
                summary: "User Signin",
                description: "Authenticate existing user",
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                username: {
                                    type: "string",
                                    description: "Username",
                                    example: "ravi123",
                                },
                                password: {
                                    type: "string",
                                    description: "Password",
                                    example: "Secure@1234",
                                },
                            },
                            required: ["username", "password"],
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Signin successful",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Signin successful.",
                                },
                                user: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                            example: "64a87b3e9d9f8c001b5f1234",
                                        },
                                        username: {
                                            type: "string",
                                            example: "ravi123",
                                        },
                                    },
                                },
                                token: {
                                    type: "string",
                                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad Request",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Username and password are required.",
                                },
                            },
                        },
                    },
                    403: {
                        description: "Authentication failed",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "User does not exist.",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal Server Error",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "An unexpected error occurred.",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/ask": {
            post: {
                tags: ["AI Chat"],
                summary: "Get AI Response",
                description: "Send a question and get AI-generated response",
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                question: {
                                    type: "string",
                                    description: "User's question",
                                    example: "What is the capital of India?",
                                },
                            },
                            required: ["question"],
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Successful response",
                        schema: {
                            type: "object",
                            properties: {
                                answer: {
                                    type: "string",
                                    example: "The capital of France is Paris.",
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Authentication required.",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal Server Error",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Internal server error",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/history": {
            get: {
                tags: ["AI Chat"],
                summary: "Get Chat History",
                description: "Retrieve user's chat history",
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: "Successful response",
                        schema: {
                            type: "object",
                            properties: {
                                historydata: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            question: {
                                                type: "string",
                                                example: "What is the capital of France?",
                                            },
                                            ans: {
                                                type: "string",
                                                example: "The capital of France is Paris.",
                                            },
                                            user: {
                                                type: "string",
                                                example: "64a87b3e9d9f8c001b5f1234",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Authentication required.",
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal Server Error",
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                    example: "Internal server error",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/health": {
            get: {
                tags: ["System"],
                summary: "System Health Check",
                description: "Get the health status of the system including server, database, and API status",
                responses: {
                    200: {
                        description: "System is healthy",
                        schema: {
                            type: "object",
                            properties: {
                                uptime: {
                                    type: "number",
                                    description: "Server uptime in seconds",
                                    example: 3600,
                                },
                                timestamp: {
                                    type: "string",
                                    description: "Current timestamp",
                                    example: "2024-12-30T12:00:00.000Z",
                                },
                                memory: {
                                    type: "object",
                                    properties: {
                                        heapTotal: {
                                            type: "number",
                                            description: "Total size of the heap",
                                            example: 34275328,
                                        },
                                        heapUsed: {
                                            type: "number",
                                            description: "Actual memory used",
                                            example: 19427856,
                                        },
                                        rss: {
                                            type: "number",
                                            description: "Resident Set Size",
                                            example: 65425408,
                                        },
                                    },
                                },
                                status: {
                                    type: "string",
                                    enum: ["healthy", "unhealthy"],
                                    example: "healthy",
                                },
                                services: {
                                    type: "object",
                                    properties: {
                                        server: {
                                            type: "string",
                                            enum: ["up", "down"],
                                            example: "up",
                                        },
                                        database: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "string",
                                                    enum: [
                                                        "connected",
                                                        "disconnected",
                                                        "connecting",
                                                        "disconnecting",
                                                        "error",
                                                    ],
                                                    example: "connected",
                                                },
                                                ping: {
                                                    type: "object",
                                                    description: "MongoDB ping result",
                                                },
                                                metrics: {
                                                    type: "object",
                                                    properties: {
                                                        collections: {
                                                            type: "number",
                                                            description: "Number of collections",
                                                            example: 5,
                                                        },
                                                        avgObjSize: {
                                                            type: "number",
                                                            description: "Average object size",
                                                            example: 255,
                                                        },
                                                        dataSize: {
                                                            type: "number",
                                                            description: "Total data size",
                                                            example: 1048576,
                                                        },
                                                        indexes: {
                                                            type: "number",
                                                            description: "Number of indexes",
                                                            example: 8,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        api: {
                                            type: "string",
                                            enum: ["up", "down"],
                                            example: "up",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    503: {
                        description: "System is unhealthy",
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    enum: ["unhealthy"],
                                    example: "unhealthy",
                                },
                                timestamp: {
                                    type: "string",
                                    example: "2024-12-30T12:00:00.000Z",
                                },
                                error: {
                                    type: "string",
                                    example: "Database connection failed",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.default = apiDoc;
