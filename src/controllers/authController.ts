import { Request, Response } from "express";
import { User } from "../infra/repositories/mongoDB/models/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function login(req: Request, res: Response) {
  const dateObject = new Date();

  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({
      statusCode: 422,
      message: "Expected 'email' field",
      timestamp: dateObject.getTime(),
    });
  }

  if (!password) {
    return res.status(422).json({
      statusCode: 422,
      message: "Expected 'password' field",
      timestamp: dateObject.getTime(),
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(204).json({
      statusCode: 204,
      message: "User not found",
      timestamp: dateObject.getTime(),
    });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return res.status(403).json({
      statusCode: 403,
      message: "Password do not match",
      timestamp: dateObject.getTime(),
    });
  }

  try {
    const secret = process.env.SECRET ?? "";
    const token = jwt.sign({ id: user._id }, secret);

    return res.status(200).json({
      statusCode: 200,
      message: "Successful login",
      timestamp: dateObject.getTime(),
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      statusCode: 400,
      message: "Invalid token",
      timestamp: dateObject.getTime(),
    });
  }
}

export const authController = {
    login
}