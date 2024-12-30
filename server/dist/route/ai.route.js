"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controller/ai.controller");
const aiRoute = (0, express_1.Router)();
aiRoute.post("/ask", ai_controller_1.getAians);
//@ts-ignore
aiRoute.get("/history", ai_controller_1.history);
exports.default = aiRoute;
