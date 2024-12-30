import { historyModel } from "../model/history";
import { getAiResponse } from "../utils/gemaniresponse";
import { Request, Response } from "express";

export const getAians = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    let response = await getAiResponse(question);
    let result = await historyModel.create({
      question,
      ans: response,
      //@ts-ignore
      user: req.userID,
    });

    res.status(200).json({
      answer: result.ans,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const history = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    let historydata = await historyModel.find({ user: req.userID });
    res.status(200).json({
        historydata,
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};
