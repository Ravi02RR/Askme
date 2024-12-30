import { createHash, comparePassword } from "../utils/bcrypt";
import { createToken } from "../utils/jsonWebtoken";
import { userModel } from "../model/user.model";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    // console.log(username);

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const foundUser = await userModel.findOne({ username });
    if (foundUser) {
      return res.status(403).json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await createHash(password);

    const newUser = await userModel.create({
      username,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created successfully.",
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

export const signin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const foundUser = await userModel.findOne({ username });
    if (!foundUser) {
      return res.status(403).json({ message: "User does not exist." });
    }

    const isCorrectPass = await comparePassword(password, foundUser.password);
    if (!isCorrectPass) {
      return res.status(403).json({ message: "Incorrect password." });
    }

    const token = createToken({ username: foundUser.username });

    return res
      .status(200)
      .cookie("token", token)
      .json({
        message: "Signin successful.",
        user: { id: foundUser._id, username: foundUser.username },
        token,
      });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};
