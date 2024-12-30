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
exports.getAiResponse = void 0;
const generative_ai_1 = require("@google/generative-ai");
const getAiResponse = (question) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.GEMNAI) {
            throw new Error("Google Generative AI key (GEMNAI) is not defined.");
        }
        const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMNAI);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = yield model.generateContent(question);
        if (result && result.response.text()) {
            return result.response.text();
        }
        else {
            throw new Error("No content returned by the generative model.");
        }
    }
    catch (err) {
        console.error("Error generating AI response:", err.message);
        return null;
    }
});
exports.getAiResponse = getAiResponse;