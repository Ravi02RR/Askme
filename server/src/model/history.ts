import mongoose, { Document } from "mongoose";

interface IHistory extends Document {
  question: string;
  ans: string;
  user: mongoose.Types.ObjectId;
}

const historySchema = new mongoose.Schema<IHistory>(
  {
    question: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const historyModel = mongoose.model<IHistory>("History", historySchema);
