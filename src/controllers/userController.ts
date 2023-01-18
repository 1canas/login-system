import { Response, Request, NextFunction } from "express";
import { User } from "../models/User";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

async function register(req: Request, res: Response) {
  const dateObject = new Date();

  const { name, email, password, confirmPassword } = req.body;

  if (!name) {
    return res.status(422).json({
      statusCode: 422,
      message: "Expected 'name' field",
      timestamp: dateObject.getTime(),
    });
  }

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
      message: "Expected 'passwword' field",
      timestamp: dateObject.getTime(),
    });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({
      statusCode: 422,
      message: "Password and confirm password must be equals",
      timestamp: dateObject.getTime(),
    });
  }

  const matchedUser = await User.findOne({ email });

  if (matchedUser) {
    return res.status(422).json({
      statusCode: 422,
      message: "User already exists",
      timestamp: dateObject.getTime(),
    });
  }

  const salt = await bcrypt.genSalt(11);
  const saltedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({
      email,
      name,
      password: saltedPassword,
    });

    const { _id } = await user.save();

    return res.status(201).json({
      statusCode: 201,
      message: "User registered successfully",
      id: _id,
      timestamp: dateObject.getTime(),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server internal error",
      timestamp: dateObject.getTime(),
    });
  }
}

async function get(req: Request, res: Response) {
  const dateObject = new Date();
  const { id } = req.params;

  if (!id) {
    return res.status(422).json({
      statusCode: 422,
      message: "Expected 'id' param",
      timestamp: dateObject.getTime(),
    });
  }

  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(204).json({
      statusCode: 204,
      message: "User not found",
      timestamp: dateObject.getTime(),
    });
  }

  return res.status(200).json({
    statusCode: 200,
    user: user,
    timestamp: dateObject.getTime(),
  });
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const dateObject = new Date();

  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.status(422).json({
      statusCode: 422,
      message: "authorization token expected",
      timestamp: dateObject.getTime(),
    });
  }

  const token = authHeaders.split(" ")[1];

  if (!token) {
    return res.status(201).json({
      statusCode: 201,
      message: "Not authorized",
      timestamp: dateObject.getTime(),
    });
  }

  try {
    const secret = process.env.SECRET ?? "";

    jwt.verify(token, secret);

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
      timestamp: dateObject.getTime(),
    });
  }
}

async function remove(req: Request, res: Response) {
  const dateObject = new Date();
  
  const { id, password } = req.body;

  if (!id) {
    return res.status(422).json({
      statusCode: 422,
      message: "User ID expected",
      timestamp: dateObject.getTime(),
    });
  }

  if (!password) {
    return res.status(422).json({
      statusCode: 422,
      message: "Password expected",
      timestamp: dateObject.getTime(),
    });
  }

  const user = await User.findById(id);

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
      message: "Incorrect password",
      timestamp: dateObject.getTime(),
    });
  }

  try {
    User.findByIdAndRemove(id);

    res.status(200).json({
      statusCode: 200,
      message: "User deleted successfully",
      userId: id,
      timestamp: dateObject.getTime()
    });

  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Server internal error",
      timestamp: dateObject.getTime(),
    });
  }
}

function update(req: Request, res: Response) {
  return res.status(401).send("não impl");
}

export const userController = {
  register,
  get,
  remove,
  update,
};
