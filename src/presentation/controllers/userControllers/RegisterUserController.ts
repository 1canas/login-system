import RegisterUserUseCase from "../../../useCases/userUseCases/RegisterUserUseCase";
import { Request, Response } from "express";
import { responseMessage } from "../../static/responseMessage";
import { UserAlreadyExistError } from "../../../useCases/userUseCases/errors/UserAlreadyExistsError";
import { PasswordNotMatchError } from "../../../useCases/userUseCases/errors/PasswordNotMatchError";

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const dateObject = new Date();

    const { name, email, password, confirmPassword } = req.body;

    try {
      const { id } = await this.registerUserUseCase.execute({
        name,
        email,
        password,
        confirmPassword,
      });

      return res.status(201).json({
        ...responseMessage(201, "User created successfully"),
        id
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        return res.status(409).json(responseMessage(409, error.message));
      }

      if (error instanceof PasswordNotMatchError) {
        return res.status(422).json(responseMessage(422, error.message));
      }

      return res.status(500).json(responseMessage(500, "Server internal error"));
    }
  }
}
