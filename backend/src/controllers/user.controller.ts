import { Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields!" });

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hasedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userModel.create({
      name,
      email,
      password: hasedPassword,
    });

    const token = jwt.sign(
      { user: createdUser },
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    res.cookie("auth_cookie", token);

    res.status(201).json({
      success: true,
      message: "SignUp successfull",
      user: createdUser,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "SignUp error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields!" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exists" });

    const validPassword = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { user: user },
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    res.cookie("auth_cookie", token);

    res.status(201).json({
      success: true,
      message: "LogIn successfull",
      user: user,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "LogIn error", error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth_cookie");

    res.status(201).json({
      success: true,
      message: "LogOut successfull",
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "LogOut error", error });
  }
};
