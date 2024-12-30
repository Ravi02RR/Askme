import { Router } from "express";
import { getAians, history } from "../controller/ai.controller";

const aiRoute = Router();

aiRoute.post("/ask", getAians);
//@ts-ignore
aiRoute.get("/history", history);

export default aiRoute;
