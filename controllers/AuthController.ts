import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User.model";
import createError from "../utils/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const UserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, image } = req.body;

    // Check if JWT secret is available
    if (!process.env.JWT) {
      return next(createError(500, "JWT secret is missing"));
    }

    const existingUser = await UserModel.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "User is already exists."));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new UserModel({
      name,
      password: hashedPassword,
      email,
      image,
    });

    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT!, {
      expiresIn: "7d",
    });
    res.status(200).json({
      token,
      createdUser,
    });

    return;
  } catch (error) {
    return next(error);
  }
};

export const UserLogin = (req: Request, res: Response) => {
  // Example logic
  res.send("Login user logic goes here");
};
