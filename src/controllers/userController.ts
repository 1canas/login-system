import { Response, Request, NextFunction } from "express";
import { User } from "../infra/repositories/mongoDB/models/User";

import { UserService } from "../services/userService";
import { userValidator } from "./validators/UserValidator";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  
  async register(req: Request, res: Response) {
    const dateObject = new Date();
    const { name, email, password, confirmPassword } = req.body;

    const registerInputValidation = userValidator.validateRegisterInput({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!registerInputValidation.validate) {
      return res.status(422).json({
        statusCode: 422,
        message: registerInputValidation.message,
        timestamp: dateObject.getTime(),
      });
    }

    const alreadyExistUserValidation =
      await userValidator.verifyUserAlreadyExist(email);

    if (!alreadyExistUserValidation.validate) {
      return res.status(422).json({
        statusCode: 422,
        message: alreadyExistUserValidation.message,
        timestamp: dateObject.getTime(),
      });
    }

    try {
      const _id = this.userService.saveUser({ name, email, password });

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
      timestamp: dateObject.getTime(),
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
  get,
  remove,
  update,
};
