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
exports.gethistory = exports.getAians = void 0;
const history_1 = require("../model/history");
const gemaniresponse_1 = require("../utils/gemaniresponse");
const getAians = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question } = req.body;
        let response = yield (0, gemaniresponse_1.getAiResponse)(question);
        let result = yield history_1.historyModel.create({
            question,
            ans: response,
            //@ts-ignore
            user: req.userID,
        });
        res.status(200).json({
            answer: result.ans,
        });
    }
    catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getAians = getAians;
const gethistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        console.log(req.userID);
        //@ts-ignore
        let historydata = yield history_1.historyModel.find({ user: req.userID });
        console.log(historydata);
        res.status(200).json({
            historydata,
        });
    }
    catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.gethistory = gethistory;
