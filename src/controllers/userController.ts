import { Response, Request } from "express";
import mongoose from "mongoose";
import { User } from "../models/User";

import bcrypt from "bcrypt";

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
      timestamp: dateObject.getDate(),
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

  const findedUser = await User.findById(id, '-password');

  if (!findedUser) {
    return res.status(204).json({
      statusCode: 204,
      message: "User not found",
      timestamp: dateObject.getTime(),
    });
  }

  return res.status(200).json({
    statusCode: 200,
    user: findedUser,
    timestamp: dateObject.getTime()
  });
}

function remove(req: Request, res: Response) {
  return res.status(401).send("não impl");
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
