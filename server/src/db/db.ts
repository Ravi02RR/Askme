import mongoose from "mongoose";

export const connectToDb = async (uri: string) => {
  await mongoose.connect(uri);
  console.log("database connected");
};
