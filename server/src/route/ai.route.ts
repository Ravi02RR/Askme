import { Router } from "express";
import { getAians, gethistory } from "../controller/ai.controller";

const aiRoute = Router();

aiRoute.post("/ask", getAians);
//@ts-ignore
aiRoute.get("/history", gethistory);

export default aiRoute;
