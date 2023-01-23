import RegisterUserUseCase from "../../../useCases/registerUser/RegisterUserUseCase";
import { Request, Response } from "express";

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const dateObject = new Date();

    const { name, email, password } = req.body;

    try {
      const { id } = await this.registerUserUseCase.execute({ name, email, password });

      return res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        timestamp: dateObject.getTime(),
        id
      });
    } catch (err) {
      console.log(err);
     
      return res.status(500).json({
        statusCode: 500,
        message: "Server internal error",
        timestamp: dateObject.getTime(),
      });
    }
  }
}
